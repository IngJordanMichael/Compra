const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { create } = require("express-handlebars");
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const multer = require('multer'); 
const passport = require('passport');
const roles = require('./libs/create-rol')
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});

/*iniciar aplicacion*/
const app = express();
roles();


require('./config/passport')
/*configuration*/

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    ".hbs",
    create({
      layoutsDir: path.join(app.get("views"), "layouts"),
      partialsDir: path.join(app.get("views"), "partials"),
      defaulLayout: "main",
      extname: ".hbs",
    }).engine
  );
app.set("view engine", ".hbs");
/*Middlewares*/
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(multer({
  storage,
  dest : path.join(__dirname, 'public/uploads')
}).single('image'));
/**Rutas */
/*Varibles globales*/
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
/*rutas*/
app.use(require('./routes/indexRoutes'));
app.use(require('./routes/notesRoutes'));
app.use(require('./routes/users-routes'));
app.use(require('./routes/products-routes'));
/* static files*/
app.use(express.static(path.join(__dirname, 'public')));

/* exportar aplicacion */
module.exports = app;


