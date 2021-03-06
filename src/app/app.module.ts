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
import {registerLocaleData } from '@angular/common';
import localeBR from '@angular/common/locales/pt-PT';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ViagensComponent } from './modulos/viagens/viagens.component';
import { FormViajemComponent } from './modulos/viagens/form-viajem.component';
import { LoaderComponent } from './loader/loader.component';


//Imports Meterisal Angular:
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderInterceptor } from './loader/interceptors/loader.interceptor';
import { FuncionariosComponent } from './modulos/funcionarios/funcionarios.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { EspecificacaoGastoComponent } from './modulos/especificacoes-gastos/especificacoes-gastos.component';
import { EspecificacoesGastosService } from './modulos/especificacoes-gastos/especificacoes-gastos.service';
import { EspecificacoesGastosFormComponent } from './modulos/especificacoes-gastos/form-especificacoes-gastos.component';
import { GastosComponent } from './modulos/gastos/gastos.component';
import { GastoService } from './modulos/gastos/gasto.service';
import { SubEspecificacoesGastosComponent } from './modulos/sub-especificacoes-gastos/sub-especificacoes-gastos.component';

/********CHARTS*********/
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartsComponent } from './charts/charts.component';
import { ExcelGastosService } from './modulos/excel-services/excel-gastos.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { SubEspecificacoesService } from './modulos/sub-especificacoes-gastos/sub-especificacoes.service';
import { FormSubespecificacoesGastosComponent } from './modulos/sub-especificacoes-gastos/form-subespecificacoes-gastos.component';
import { SolicitarViajemComponent } from './modulos/solicitar-viajem/solicitar-viajem.component';
import { SolicitarViajemService } from './modulos/solicitar-viajem/solicitar-viajem.service';
import { FormSolicitarViajemComponent } from './modulos/solicitar-viajem/form-solicitar-viajem.component';
import { PaginatorSolicitarViajemComponent } from './paginator/paginator-solicitar_viajem.component';
import { ProvisoesViajemFinanceiroComponent } from './modulos/provisoes-viajem-financeiro/provisoes-viajem-financeiro.component';
import { ProvisoesViajemFinanceiroService } from './modulos/provisoes-viajem-financeiro/provisoes-viajem-financeiro.service';
import { PaginatorProvisoesViajemFinanceiroComponent } from './paginator/paginator-provisoes-viajem-financeiro.component';
import { FormProvisoesViajemFinanceiroComponent } from './modulos/provisoes-viajem-financeiro/form-provisoes-viajem-financeiro.component';
import {MatListModule} from '@angular/material/list';
import { DiretoriaComponent } from './modulos/diretoria/diretoria.component';
import { FormDiretoriaComponent } from './modulos/diretoria/form-diretoria.component';
import { DiretoriaService } from './modulos/diretoria/diretoria.service';
import { PaginatorDiretoriaComponent } from './paginator/paginator-diretoria.component';

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
    LoginComponent,
    ViagensComponent,
    FormViajemComponent,
    LoaderComponent,
    EspecificacaoGastoComponent,
    EspecificacoesGastosFormComponent,
    GastosComponent,
    SubEspecificacoesGastosComponent,
    ChartsComponent,
    FormSubespecificacoesGastosComponent,
    SolicitarViajemComponent,
    FormSolicitarViajemComponent,
    PaginatorSolicitarViajemComponent,
    ProvisoesViajemFinanceiroComponent,
    FormProvisoesViajemFinanceiroComponent,
    PaginatorProvisoesViajemFinanceiroComponent,
    DiretoriaComponent,
    FormDiretoriaComponent,
    PaginatorDiretoriaComponent
      
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    GoogleChartsModule,
    MatExpansionModule,
    MatListModule
       
    
  ],
  providers: [CidadeService, FuncionarioService, SetorService, AuthService, EspecificacoesGastosService,
              GastoService, ExcelGastosService, SubEspecificacoesService, SolicitarViajemService,
              ProvisoesViajemFinanceiroService, DiretoriaService,
              {provide: LOCALE_ID, useValue: 'br' },
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
