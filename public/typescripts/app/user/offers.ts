import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http, HTTP_PROVIDERS,Headers} from 'angular2/http';

@Component({
    selector: 'offers',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'typescripts/app/templates/offers_temp.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class OffersComponent {

    public offers:Array<any>;
    public type:string;
    public name:string;

    constructor(public http:Http) {
        this.type="-";
        this.name="-";
        this.loadOffers();
    }

    loadOffers() {
        var filters;
        if(this.type==="-" && this.name==="-"){
            filters={}
        }else if(this.type==="-" && this.name!=="-"){
            filters={name:this.name};
        }else if(this.type!=="-" && this.name==="-"){
            filters={type:this.type};
        }else{
            filters={name:this.name,type:this.type};
        }

        this.http.post('/offer/all/'+JSON.stringify(filters), JSON.stringify(filters), {
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .subscribe(data => {
                this.offers = data.json();
            });
    }

    executeOrder(item) {
        var itemStr = JSON.stringify(item);
        this.http.post('/offer/buy/' + itemStr, itemStr, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(res => {
            this.loadOffers();
        }, err=> {
            console.log(err);
        });
    }

}