const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    /**Comprobar si existe el usuario */
    const user = await User.findOne({email})

    if(!user){
         return done(null, false, {message: 'Not user found '});
    }else{
        /* si no existe el correo*/ 
      const matchPassword =  await user.matchPassword(password);
      if(matchPassword){
        return done(null, user);
      }else{
        return done(null, false, {message: 'Incorrect password '});
        
      }
    }
}));
 passport.serializeUser((user, done) => {
    done(null, user.id);
 });

 passport.deserializeUser((id, done) => {

    User.findById(id, (err, user) => {
      
      let roles = false;
      if(user.roles == '628c3c00230c038c98891491'){
        roles = true;
      }
        let userId = { 
        _id: user.id,
        usuario: user.name, 
        correo: user.email,
        password: user.password,
        roles: roles
      };
      console.log(userId);
      done(err, userId);
    })
 })

