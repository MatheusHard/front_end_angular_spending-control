import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  swal  from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Sign In!";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {

  }
  login():void{

    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Erro no Login', 'Usernameou senha não podem ser vazios!!!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.router.navigate(['home']);
      swal.fire('Login', `Sr(a). ${response.nome_usuario},  com sessão iniciada`, 'info');
    });
  }


}
