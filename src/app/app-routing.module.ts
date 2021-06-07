import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesComponent } from './cidades/cidades.component';
import { CidadeFormComponent } from './cidades/form-cidade.component';

const routes: Routes = [
  {path:'cidades/list', component: CidadesComponent  },
  {path:'cidades/page/:page', component: CidadesComponent  },
  {path:'cidades/form', component: CidadeFormComponent  },
  {path:'cidades/form/:id', component: CidadeFormComponent  },
  {path:'', redirectTo: 'home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
