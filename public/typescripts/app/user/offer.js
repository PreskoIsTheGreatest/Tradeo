var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var http_1 = require('angular2/http');
var offer_1 = require('./../models/offer');
var OfferComponent = (function () {
    function OfferComponent(http) {
        this.http = http;
        this.isValidOffer = true;
        this.isNotShowingSuccess = true;
        this.isNotShowInvalidNumber = true;
        this.offer = new offer_1.Offer("BUY", "EUR", 0, 0);
        this.loadUserOffers();
    }
    OfferComponent.prototype.constructOffer = function (of) {
        if (of.type === "SELL") {
            of.give = { name: of.name, amount: of.amount };
            of.get = { amount: of.price * of.amount };
            if (of.name === "USD") {
                of.get.name = "EUR";
            }
            else if (of.name === "EUR") {
                of.get.name = "USD";
            }
        }
        else if (of.type === "BUY") {
            of.get = { name: of.name, amount: of.amount };
            of.give = { amount: of.price * of.amount };
            if (of.name === "USD") {
                of.give.name = "EUR";
            }
            else if (of.name === "EUR") {
                of.give.name = "USD";
            }
        }
        return of;
    };
    OfferComponent.prototype.createOffer = function () {
        var _this = this;
        if (this.offer.price <= 0 || this.offer.amount < 1) {
            this.isNotShowInvalidNumber = false;
            return false;
        }
        var offerObj = {
            name: this.offer.name,
            type: this.offer.type,
            price: this.offer.price,
            amount: this.offer.amount
        };
        var offerObjWithGetAndGive = this.constructOffer(offerObj);
        var offerStr = encodeURIComponent(JSON.stringify(offerObjWithGetAndGive));
        this.http.post('/offer/create/' + offerStr, offerStr, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(function (res) {
            _this.isNotShowingSuccess = false;
            _this.offer = new offer_1.Offer("BUY", "EUR", 0, 0);
            _this.loadUserOffers();
        }, function (err) {
            _this.isValidOffer = false;
            console.log(err);
        });
    };
    OfferComponent.prototype.loadUserOffers = function () {
        var _this = this;
        this.http.get('/offer/user').subscribe(function (data) {
            _this.offers = data.json();
        });
    };
    OfferComponent.prototype.deleteOffer = function (item) {
        var _this = this;
        var itemStr = JSON.stringify(item);
        this.http.post('offer/delete/' + itemStr, itemStr, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(function () {
            _this.loadUserOffers();
            console.log("success");
        });
    };
    OfferComponent = __decorate([
        core_1.Component({
            selector: 'offer',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'typescripts/app/templates/offer_temp.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OfferComponent);
    return OfferComponent;
})();
exports.OfferComponent = OfferComponent;
//# sourceMappingURL=offer.js.map