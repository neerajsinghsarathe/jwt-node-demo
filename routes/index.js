var express = require('express');
var router = express.Router();
const { signUp_GET, login_GET } = require('../controllers/indexController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

/* GET home page. */
router.get('*', checkUser);

router.get('/', requireAuth ,(req, res)=>{
    res.render('index',{ title: 'Ninja Smoothies'})
});

router.get('/logout', requireAuth ,(req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
});

router.get('/smoothies', requireAuth ,(req, res)=>{
    res.render('smoothies',{ title: 'Ninja Smoothies'})
});
router.get('/login', login_GET);
router.get('/signup', signUp_GET);


module.exports = router;
