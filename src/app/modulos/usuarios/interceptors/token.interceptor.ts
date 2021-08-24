import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  /********Classe que intercepta o httpToken e envia pra autoriza POST, GET, PUT, DELETE*************/ 
    
  constructor(private authService: AuthService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {

            let token = this.authService.token;

            if(token != null){
                const authReq = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer '+ token)
                });
                return next.handle(authReq);
            }
        return next.handle(req);
    }
}