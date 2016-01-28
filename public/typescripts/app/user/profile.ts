import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {User} from './../models/user';

@Component({
    selector: 'profile',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'typescripts/app/templates/profile_temp.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ProfileComponent {

    public user:User;

    constructor(public http:Http) {
        this.user=new User("",[]);
        this.http.get('/user')
            .subscribe(data => {
                var rawUser =  data.json();
                this.user = new User(rawUser.username,rawUser.portfolio);
            });
    }
}