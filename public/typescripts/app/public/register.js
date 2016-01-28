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
var browser_1 = require('angular2/platform/browser');
var common_1 = require('angular2/common');
var http_1 = require('angular2/http');
var RegisterComponent = (function () {
    function RegisterComponent(http) {
        this.http = http;
        this.isNotOpenPassNotMatch = true;
        this.isNotOpenUserExist = true;
        this.isNotOpenSuccess = true;
        this.username = "";
    }
    RegisterComponent.prototype.register = function (pass, conf) {
        var _this = this;
        this.isNotOpenPassNotMatch = true;
        this.isNotOpenUserExist = true;
        this.isNotOpenSuccess = true;
        if (pass.value !== conf.value) {
            this.isNotOpenPassNotMatch = false;
            return false;
        }
        var userData = {
            username: this.username,
            password: pass.value
        };
        var stringUser = JSON.stringify(userData);
        console.log(stringUser, 1);
        console.log(userData, 1);
        this.http.post('/user/register/' + stringUser, stringUser, {
            headers: new http_1.Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(function (res) {
            _this.isNotOpenSuccess = false;
            _this.username = "";
            pass.value = "";
            conf.value = "";
        }, function (err) {
            _this.isNotOpenUserExist = false;
        });
        return true;
    };
    RegisterComponent.prototype.reset = function () {
        this.isNotOpenPassNotMatch = true;
        this.isNotOpenUserExist = true;
        this.isNotOpenSuccess = true;
        this.username = "";
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'typescripts/app/templates/register_temp.html',
            styleUrls: ['stylesheets/validation.css'],
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RegisterComponent);
    return RegisterComponent;
})();
exports.RegisterComponent = RegisterComponent;
browser_1.bootstrap(RegisterComponent, [
    http_1.HTTP_PROVIDERS
]);
//# sourceMappingURL=register.js.map