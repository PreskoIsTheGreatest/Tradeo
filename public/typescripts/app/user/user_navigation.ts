import {Component,View,provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_BINDINGS,AsyncRoute} from 'angular2/router';
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {ProfileComponent} from './profile';
import {OfferComponent} from './offer';
import {ChartComponent} from './chart';

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
    new AsyncRoute({
        path: '/chart',
        loader: ()=>System.import('./typescripts/app/user/chart').then(m=>m.ChartComponent),
        name: 'Chart'
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