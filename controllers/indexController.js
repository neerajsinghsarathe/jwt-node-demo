function login_GET(req, res, next) {
    res.render('login',{title : 'Log In'});
}
function signUp_GET(req, res, next) {
    res.render('signup',{title : 'Sign Up'});
}

module.exports = {
    login_GET,
    signUp_GET
}