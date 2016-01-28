import {Component,provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http,Headers,HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'register',
    templateUrl: 'typescripts/app/templates/register_temp.html',
    styleUrls:['stylesheets/validation.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class RegisterComponent {

    public username:string;
    public isNotOpenPassNotMatch:boolean = true;
    public isNotOpenUserExist:boolean = true;
    public isNotOpenSuccess:boolean = true;


    constructor(public http:Http) {
        this.username = "";
    }

    public register(pass, conf):boolean {
        this.isNotOpenPassNotMatch = true;
        this.isNotOpenUserExist = true;
        this.isNotOpenSuccess = true;
        if (pass.value !== conf.value) {
            this.isNotOpenPassNotMatch = false;
            return false;
        }

        let userData = {
            username: this.username,
            password: pass.value
        };

        let stringUser = JSON.stringify(userData);
        console.log(stringUser,1);
        console.log(userData,1);
        this.http.post('/user/register/' + stringUser, stringUser, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(res => {
            this.isNotOpenSuccess = false;
            this.username="";
            pass.value="";
            conf.value="";
        }, err=> {
            this.isNotOpenUserExist = false
        });
        return true;
    }

    reset() {
        this.isNotOpenPassNotMatch = true;
        this.isNotOpenUserExist = true;
        this.isNotOpenSuccess = true;
        this.username = "";
    }

}

bootstrap(RegisterComponent, [
    HTTP_PROVIDERS
]);