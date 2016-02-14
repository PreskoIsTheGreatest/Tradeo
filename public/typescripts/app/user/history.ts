import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http, HTTP_PROVIDERS,Headers} from 'angular2/http';

@Component({
    selector: 'offers',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'typescripts/app/templates/history_temp.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HistoryComponent {

    public offers:Array<any>;

    constructor(public http:Http) {
        this.loadHistory();
    }

    loadHistory(){
        this.http.get('/offer/history').subscribe(data=>{
            this.offers = data.json().map((el)=>{
                el.created=new Date(el.created).toDateString();
                if(el.executed){
                    el.executed=new Date(el.executed).toDateString();
                }
                if(el.is_valid){
                    el.is_valid="Да";
                }else{
                    el.is_valid="Не";
                }
                return el;
            });
        })
    }


}