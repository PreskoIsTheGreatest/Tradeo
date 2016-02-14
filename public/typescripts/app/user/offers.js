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
var OffersComponent = (function () {
    function OffersComponent(http) {
        this.http = http;
        this.type = "-";
        this.name = "-";
        this.loadOffers();
    }
    OffersComponent.prototype.loadOffers = function () {
        var _this = this;
        var filters;
        if (this.type === "-" && this.name === "-") {
            filters = {};
        }
        else if (this.type === "-" && this.name !== "-") {
            filters = { name: this.name };
        }
        else if (this.type !== "-" && this.name === "-") {
            filters = { type: this.type };
        }
        else {
            filters = { name: this.name, type: this.type };
        }
        this.http.post('/offer/all/' + JSON.stringify(filters), JSON.stringify(filters), {
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        })
            .subscribe(function (data) {
            _this.offers = data.json();
        });
    };
    OffersComponent.prototype.executeOrder = function (item) {
        var _this = this;
        var itemStr = JSON.stringify(item);
        this.http.post('/offer/buy/' + itemStr, itemStr, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(function (res) {
            _this.loadOffers();
        }, function (err) {
            console.log(err);
        });
    };
    OffersComponent = __decorate([
        core_1.Component({
            selector: 'offers',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'typescripts/app/templates/offers_temp.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OffersComponent);
    return OffersComponent;
})();
exports.OffersComponent = OffersComponent;
//# sourceMappingURL=offers.js.map