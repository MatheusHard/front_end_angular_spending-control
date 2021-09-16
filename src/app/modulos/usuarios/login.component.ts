import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  swal  from 'sweetalert2';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  form: FormGroup;
  public loginInvalid = false;
  hide = true;
  title: string = "Acesso";

  

  constructor(private authService: AuthService, private router: Router, form: FormBuilder) {
    this.usuario = new Usuario();
    this.form = form.group({username: ['', Validators.required], password: ['', Validators.required]
    });
   }
   

  ngOnInit(): void {

    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Sessão iniciada: Sr(a). ${this.authService.usuario.username}`, 'info')
      this.router.navigate(['/']);
    }
  }

/***********LOGIN************/

  login():void{

    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Erro no Login', 'Obrigatório preenchimento do o Usuario e senha!!!', 'error');
      return;
    }
     
      this.authService.login(this.usuario).subscribe(response => {

      this.authService.salvarUsuario(response.access_token);
      this.authService.salvarToken(response.access_token);
      let usuario = this.authService.usuario;

      this.router.navigate(['/']);
      swal.fire('Login', `Sr(a). ${usuario.username},  com sessão iniciada`, 'info');
    }, erro => {
      if(erro.status == 400){
        swal.fire('Erro no Login', `Usuario ou senha errados!!!`, 'error');
      }
    });
  }


}
