import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesComponent } from './cidades/cidades.component';
import { FormComponent } from './cidades/form.component';

const routes: Routes = [
  //{path: 'home', component: MainNavComponent},
  {path:'cidades/list', component: CidadesComponent  },
  {path:'cidades/form', component: FormComponent  },

  //{path:'cidades/create', component: DialogElementsExample  },
  //{path:'cidades/:id', component: CidadeUpdateComponent  },
  {path:'', redirectTo: 'home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
