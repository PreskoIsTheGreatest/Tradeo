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
var HistoryComponent = (function () {
    function HistoryComponent(http) {
        this.http = http;
        this.loadHistory();
    }
    HistoryComponent.prototype.loadHistory = function () {
        var _this = this;
        this.http.get('/offer/history').subscribe(function (data) {
            _this.offers = data.json().map(function (el) {
                el.created = new Date(el.created).toDateString();
                if (el.executed) {
                    el.executed = new Date(el.executed).toDateString();
                }
                if (el.is_valid) {
                    el.is_valid = "Да";
                }
                else {
                    el.is_valid = "Не";
                }
                return el;
            });
        });
    };
    HistoryComponent = __decorate([
        core_1.Component({
            selector: 'offers',
            viewProviders: [http_1.HTTP_PROVIDERS],
            templateUrl: 'typescripts/app/templates/history_temp.html',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HistoryComponent);
    return HistoryComponent;
})();
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.js.map