import {Component,View,provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS,AsyncRoute} from 'angular2/router';
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {ProfileComponent} from './profile';
import {OfferComponent} from './offer';
import {OffersComponent} from './offers';
import {ChartComponent} from './chart';
import {HistoryComponent} from './history';

declare var System:any;

@Component({
    selector: 'user-view'
})
@RouteConfig([
    new AsyncRoute({
        path: '/profile',
        loader: ()=>System.import('./typescripts/app/user/profile').then(m=>m.ProfileComponent),
        name: 'Profile',
        useAsDefault: true
    }),
    {
        path: '/offer',
        loader: ()=>System.import('./typescripts/app/user/offer').then(m=>m.OfferComponent),
        name: 'Offer'
    },
    {
        path: '/offers',
        loader: ()=>System.import('./typescripts/app/user/offers').then(m=>m.OffersComponent),
        name: 'Offers'
    },
    new AsyncRoute({
        path: '/chart',
        loader: ()=>System.import('./typescripts/app/user/chart').then(m=>m.ChartComponent),
        name: 'Chart'
    }),
    new AsyncRoute({
        path: '/history',
        loader: ()=>System.import('./typescripts/app/user/history').then(m=>m.HistoryComponent),
        name: 'History'
    })
])
@View({
    templateUrl: './typescripts/app/templates/user_navigation_temp.html',
    directives: [ROUTER_DIRECTIVES],
})

class UserNavigation {
    constructor() {
    }
}

bootstrap(UserNavigation, [
    provide(APP_BASE_HREF, {useValue: '/'}),
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);