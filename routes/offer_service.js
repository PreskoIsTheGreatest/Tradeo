module.exports = function (express, db) {

    var router = express.Router();

    router.get('/all',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            db.offer.loadOffers((docs)=> {
                res.json(docs);
            })
        });

    router.get('/user',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            db.offer.loadUserOffers(req.user.portfolio,(docs)=> {
                res.json(docs);
            })
        });

    router.post('/buy/:offer',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            var offer = JSON.parse(req.params.offer);
            isValid(req.user,offer.geting,(r)=>{
                if(r){
                    db.offer.executeOffer(req.user,offer,()=>{
                        res.sendStatus(200);
                    });
                }else{
                    res.sendStatus(401);
                }
            });
        });

    router.post('/create/:offerData',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            var offerRaw = JSON.parse(req.params.offerData);
            isValid(req.user, offerRaw.give, (r)=> {
                if (r) {
                    offerRaw.userId = req.user._id;
                    db.offer.createOffer(offerRaw, ()=> {
                        res.sendStatus(200);
                    });
                } else {
                    res.sendStatus(401);
                }
            });
        });

    function isValid(user,offer,cb){
        db.user.getUserAmountFromCurrencyName(user._id,offer.name,(result)=>{
            cb(result>=offer.amount);
        })
    }

    router.post('/graph/:filters',
        require('connect-ensure-login').ensureLoggedIn(),
        function (req, res) {
            var filters=JSON.parse(req.params.filters);
            db.offer.getQuotationGraphData(filters,(results)=>{
                res.json(results);
            })
        });

    return router;
};
