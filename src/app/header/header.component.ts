import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../modulos/usuarios/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'  
 })
export class HeaderComponent {
    
    title: string = "App Gastos";

    authService: AuthService;
    
    constructor(authService: AuthService, private router: Router) { 

        this.authService = authService;
    }

    logout(): void {
      let username = this.authService.usuario.username;
      this.authService.logout();
      Swal.fire('Logout', `Ola Sr.(a) ${username}, encerrada a sessão!`, 'success');
      this.router.navigate(['/login']);
  }
}

