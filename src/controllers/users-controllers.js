const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');
const Role = require('../models/roles');

/*LLamar formulario */
usersCtrl.rendersSignUpForm = async(req, res) => {
    res.render('users/signup');
}
/*Registrar usuario */
usersCtrl.signup = async(req, res) => {
    const errors = [];
    const {name, email, password, confirm_password, roles} = req.body;
    if (password != confirm_password){
        errors.push({text: 'Password do not match'});
    }if(password.length< 4){
        errors.push({text: 'Password must be at least 4 characters long'});
    }if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email
        });
        
    }else{
       const emailUser = await User.findOne({email: email});
       if(emailUser){
        req.flash('error_msg', 'the email is already in use');
        res.redirect('/users/signup');
           
       }else{
        const newUser = User({name, email, password});
           if(roles){
            const foundRoles = await Role.find({name: {$in: roles}});
            newUser.roles = foundRoles.map(role => role._id);
           }else{
            const role = await Role.findOne({name: 'user'})
            newUser.roles = [role._id];
            
           }
           newUser.password = await newUser.encryptPassword(password)
            req.flash('success_msg', 'You are registrar');
            res.redirect('/users/signin');
           await newUser.save();
        
       }
    }
    console.log(req.body);
}
/**Renderizar formulario */
usersCtrl.rendersSigninUpForm = (req, res) => {
    res.render('users/signin');
}
/**Iniciar seccion */
usersCtrl.signin = (req, res, next) => {

passport.authenticate('local',{
        failureRedirect: '/users/signin',
        successRedirect: '/' ,
        failureFlash: true 
})(req, res, next)

}


usersCtrl.logout = (req, res) => {
        console.log('logout');
        req.logout();
        req.flash('success-msg', 'You are now logged out now.');
        res.redirect('/users/signin');
}
module.exports = usersCtrl;