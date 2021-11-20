import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesComponent } from './modulos/cidades/cidades.component';
import { CidadeFormComponent } from './modulos/cidades/form-cidade.component';
import { FormFuncionarioComponent } from './modulos/funcionarios/form-funcionario.component';
import { FuncionariosComponent } from './modulos/funcionarios/funcionarios.component';
import { ViagensComponent } from './modulos/viagens/viagens.component';
import { SetoresFormComponent } from './modulos/setores/form-setor.component';
import { SetoresComponent } from './modulos/setores/setores.component';
import { AuthGuard } from './modulos/usuarios/guards/auth.guard';
import { RoleGuard } from './modulos/usuarios/guards/role.guard';
import { LoginComponent } from './modulos/usuarios/login.component';
import { FormViajemComponent } from './modulos/viagens/form-viajem.component';
import { EspecificacaoGastoComponent } from './modulos/especificacoes-gastos/especificacoes-gastos.component'; 
import { EspecificacoesGastosFormComponent } from './modulos/especificacoes-gastos/form-especificacoes-gastos.component'; 
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  
  {path:'cidades/list', component: CidadesComponent  },
  {path:'cidades/page/:page', component: CidadesComponent  },
  {path:'cidades/form',     component: CidadeFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN'} },
  {path:'cidades/form/:id', component: CidadeFormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN'} },

  {path:'setores/list', component: SetoresComponent  },
  {path:'setores/page/:page', component: SetoresComponent  },
  {path:'setores/form', component: SetoresFormComponent  },
  {path:'setores/form/:id', component: SetoresFormComponent  },

  {path:'funcionarios/list', component: FuncionariosComponent  },
  {path:'funcionarios/page/:page', component: FuncionariosComponent },
  {path:'funcionarios/form', component:  FormFuncionarioComponent },
  {path:'funcionarios/form/:id', component: FormFuncionarioComponent  },

  {path:'viagens/list/:id', component: ViagensComponent  },
  {path:'viagens/page/:page', component: ViagensComponent },
  {path:'viagens/form/:id', component:  FormViajemComponent },
  {path:'viagens/form/:id/:id_v', component: FormViajemComponent },
  
  {path:'especificacao_gastos/list', component: EspecificacaoGastoComponent  },
  {path:'especificacao_gastos/page/:page', component: EspecificacaoGastoComponent },
  {path:'especificacao_gastos/form', component: EspecificacoesGastosFormComponent },
  {path:'especificacao_gastos/form/:id', component: EspecificacoesGastosFormComponent  },

  {path:'relatorios/list', component: ChartsComponent },

  
  {path:'login', component: LoginComponent  },

  
  
  {path:'', redirectTo: 'home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
