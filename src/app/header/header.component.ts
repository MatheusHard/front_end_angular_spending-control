import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { LoaderService } from "../loader/loader.service";
import { AuthService } from "../modulos/usuarios/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']  
 })
export class HeaderComponent {
    
    title: string = "App Gastos";

    authService: AuthService;
    loaderService: LoaderService;

    constructor(authService: AuthService, private router: Router, loaderService: LoaderService) { 
        this.loaderService = loaderService;
        this.authService = authService;
    }

    logout(): void {

      let username = this.authService.usuario.username;
      this.authService.logout();
      Swal.fire('Logout', `Ola Sr.(a) ${username}, encerrada a sessão!`, 'success');
      this.router.navigate(['/login']);
      
  }
}

