import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { CidadesComponent } from './cidades/cidades.component';
import { CidadeService } from './cidades/cidade.service';
import { HttpClientModule } from '@angular/common/http';
import { CidadeFormComponent } from './cidades/form-cidade.component';
import { FormsModule } from '@angular/forms';
import {registerLocaleData } from '@angular/common';
import localeBR from '@angular/common/locales/pt-PT';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { SetoresComponent } from './setores/setores.component'; 
import { SetorService } from './setores/setores.service';
import { SetoresFormComponent } from './setores/form-setor.component';
import { PaginatorSetorComponent } from './paginator/paginator-setor.component';

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
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [CidadeService, SetorService, {provide: LOCALE_ID, useValue: 'br' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
