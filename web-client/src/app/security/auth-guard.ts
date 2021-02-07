import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let currentUser = localStorage.getItem('currentUser');
        console.log("Auth guard", currentUser);
        console.log("State url",  state, " url", state.url);
        if(currentUser) {
            return true;
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url}})
        return false;
    }
}