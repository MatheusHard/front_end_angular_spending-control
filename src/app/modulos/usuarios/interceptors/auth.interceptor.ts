import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from "../auth.service";
import { Observable, throwError } from 'rxjs';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /********Classe que intercepta Requisição HTTP antes de chegar no BackEnd********/ 
    
  constructor(private authService: AuthService, private router: Router){}


    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {

         return next.handle(req).pipe(

            catchError(e => {
                if(e.status == 401){
  
                    if(this.authService.isAuthenticated()){
                      this.authService.logout();
                    }
                    this.router.navigate(['/cidades/list']);
                  }
                  if(e.status == 403){
                    Swal.fire('Acesso negado!!!', `Ola ${this.authService.usuario.username} não tem permissão!!!`, 'warning');
                    this.router.navigate(['/cidades/list']);
                  }
                  
                return throwError(e);

            })
        );
    }
}