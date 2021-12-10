import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { async, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SimpleInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('user_token') != null) {
            const request = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('user_token'))
            });

            return next.handle(request).pipe(
                tap (
                    (success) => {
                        //console.log('success',success instanceof HttpResponse);
                    },
                    (error) => {
                        //console.log('error',error instanceof HttpResponse);
                        if (error.status === 401) {
                            localStorage.removeItem('user_token');
                            this.router.navigate(['login']);
                        } else if (error.status === 403) {
                            this.router.navigate(['login']);
                        }
                    }
                )
            );
        } else {
            return next.handle(req.clone());
        }
    }
}
