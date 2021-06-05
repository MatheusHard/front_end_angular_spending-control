import { NgModule } from '@angular/core';
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

registerLocaleData(localeBR, 'br');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CidadesComponent,
    CidadeFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [CidadeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
