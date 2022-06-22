const {Router} = require("express");
const { render } = require("express/lib/response");
const {renderIndex, renderAbout} = require("../controllers/indexController");
const router = Router();
router.get('/', renderIndex);
router.get('/about', renderAbout);

/*
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/about', (req, res) => {
    res.render('about')
})*/
module.exports = router;

