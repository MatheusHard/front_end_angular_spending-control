import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { CidadesComponent } from './modulos/cidades/cidades.component';
import { CidadeService } from './modulos/cidades/cidade.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CidadeFormComponent } from './modulos/cidades/form-cidade.component';
import { FormsModule } from '@angular/forms';
import {registerLocaleData } from '@angular/common';
import localeBR from '@angular/common/locales/pt-PT';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuncionariosComponent } from './modulos/funcionarios/funcionarios.component';
import { SetoresComponent } from './modulos/setores/setores.component'; 
import { SetorService } from './modulos/setores/setores.service';
import { SetoresFormComponent } from './modulos/setores/form-setor.component';
import { PaginatorSetorComponent } from './paginator/paginator-setor.component';
import { FuncionarioService } from './modulos/funcionarios/funcionario.service';
import { FormFuncionarioComponent } from './modulos/funcionarios/form-funcionario.component';
import { PaginatorFuncionarioComponent } from './paginator/paginator-funcionario.component';
import { LoginComponent } from './modulos/usuarios/login.component';
import { AuthService } from './modulos/usuarios/auth.service';
import { TokenInterceptor } from './modulos/usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './modulos/usuarios/interceptors/auth.interceptor';

registerLocaleData(localeBR, 'br');

@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    FooterComponent,
    CidadesComponent,
    CidadeFormComponent,
    PaginatorComponent,
    PaginatorSetorComponent,
    FuncionariosComponent,
    SetoresComponent,
    SetoresFormComponent,
    FormFuncionarioComponent,
    PaginatorFuncionarioComponent,
    LoginComponent
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [CidadeService, FuncionarioService, SetorService, AuthService,
              {provide: LOCALE_ID, useValue: 'br' },
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
