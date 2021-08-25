import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }

  /******Dependendo do login USER(Acesso limitado), e não ADMIN, alguns acessos irão cair aq******/

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
      if(!this.authService.isAuthenticated()){
          this.router.navigate(['/login']);
          return false;
    }

    let role = next.data['role'] as string;
    console.log(role);
    if(this.authService.hasHole(role)){
      return true;
    }
    Swal.fire('Acesso negado!!', `Sr(a). ${this.authService.usuario.username} sem permissão!!!`, 'warning')
      return false;
  }
  
}
