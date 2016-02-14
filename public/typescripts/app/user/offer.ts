import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http, HTTP_PROVIDERS,Headers} from 'angular2/http';
import {Offer} from './../models/offer';

@Component({
    selector: 'offer',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'typescripts/app/templates/offer_temp.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class OfferComponent {

    public offer:Offer;
    public offers:Array<any>;
    public isValidOffer:boolean=true;
    public isNotShowingSuccess:boolean=true;
    public isNotShowInvalidNumber:boolean=true;

    constructor(public http:Http) {
        this.offer = new Offer("BUY", `EUR`, 0,0);
        this.loadUserOffers();
    }

    private constructOffer(of){
        if(of.type==="SELL"){
            of.give={name:of.name,amount:of.amount};
            of.get={amount:of.price*of.amount};
            if(of.name==="USD"){
                of.get.name="EUR";
            }else if(of.name==="EUR"){
                of.get.name="USD";
            }
        }else if(of.type==="BUY"){
            of.get={name:of.name,amount:of.amount};
            of.give={amount:of.price*of.amount};
            if(of.name==="USD"){
                of.give.name="EUR";
            }else if(of.name==="EUR"){
                of.give.name="USD";
            }
        }
        return of;
    }

    createOffer() {

        if(this.offer.price<=0 || this.offer.amount<1){
            this.isNotShowInvalidNumber=false;
            return false;
        }

        var offerObj={
            name:this.offer.name,
            type:this.offer.type,
            price:this.offer.price,
            amount:this.offer.amount
        };

        var offerObjWithGetAndGive=this.constructOffer(offerObj);
        var offerStr=encodeURIComponent(JSON.stringify(offerObjWithGetAndGive));
        this.http.post('/offer/create/' + offerStr, offerStr, {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(res => {
            this.isNotShowingSuccess = false;
            this.offer = new Offer("BUY", "EUR", 0,0);
            this.loadUserOffers();
        }, err=> {
            this.isValidOffer=false;
            console.log(err);
        });
    }

    loadUserOffers(){
        this.http.get('/offer/user').subscribe(data=>{
            this.offers = data.json();
        })
    }

    deleteOffer(item){
        var itemStr= JSON.stringify(item);
        this.http.post('offer/delete/'+itemStr,itemStr,{
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).subscribe(()=>{
            this.loadUserOffers();
            console.log("success");
        })
    }
}