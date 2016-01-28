module.exports = function (express,passport, db) {

    var router = express.Router();
    router.post('/login',
        passport.authenticate('local', {failureRedirect: '/'}),
            function (req, res) {
                var redirect_page = "/user_page";
                res.redirect(redirect_page);
            }
    );

    router.post('/register/:userData',
        function (req, res) {
            var user = JSON.parse(req.params.userData);
            db.user.findUserByName(user.username,(err,result)=>{
                if(result){
                    res.sendStatus(401);
                }else{
                   db.user.registerUser(user,()=>{
                       res.sendStatus(200);
                   })
                }
            })
        });

    router.get('/',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            var rawUser=req.user;
                res.json(rawUser);
        });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};
