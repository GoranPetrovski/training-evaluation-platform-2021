import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { BackendMethots } from "./backend-methods";

const useMockedBackend: boolean = false;

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return of(null).pipe(mergeMap(() => {
        
            if (useMockedBackend) {
                this.handleEndpoints(request);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

    private isGET(req: HttpRequest<any>): boolean {
        return req.method === 'GET'
    }

    private isPOST(req: HttpRequest<any>): boolean {
        return req.method === 'POST'
    }

    private handleEndpoints(request: HttpRequest<any>) {
        const backendMethods = new BackendMethots(request);

        if (request.url.endsWith('/users/authenticate') && this.isPOST(request)) {
            return backendMethods.authenticate();
        }

        else if (request.url.endsWith('/users/register') && this.isPOST(request)) {
            return backendMethods.registerUser();
        }

        else if (request.url.endsWith('/users') && this.isGET(request)) {
            return backendMethods.getAllUsers();
        }

        else if (request.url.match(/\/users\/\d+$/) && this.isGET(request)) {
            return backendMethods.getUserById();
        }
    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}