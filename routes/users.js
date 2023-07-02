var express = require('express');
const { signUp_POST, login_POST } = require('../controllers/authController');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', login_POST);

router.post('/signup', signUp_POST);

module.exports = router;
