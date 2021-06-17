import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesComponent } from './cidades/cidades.component';
import { CidadeFormComponent } from './cidades/form-cidade.component';
import { SetoresFormComponent } from './setores/form-setor.component';
import { SetoresComponent } from './setores/setores.component';

const routes: Routes = [
  {path:'cidades/list', component: CidadesComponent  },
  {path:'cidades/page/:page', component: CidadesComponent  },
  {path:'cidades/form', component: CidadeFormComponent  },
  {path:'cidades/form/:id', component: CidadeFormComponent  },

  {path:'setores/list', component: SetoresComponent  },
  {path:'setores/page/:page', component: SetoresComponent  },
  {path:'setores/form', component: SetoresFormComponent  },
  {path:'setores/form/:id', component: SetoresFormComponent  },
  
  {path:'', redirectTo: 'home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
