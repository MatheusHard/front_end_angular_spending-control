import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CidadesComponent } from './cidades/cidades.component';

const routes: Routes = [
  //{path: 'home', component: MainNavComponent},
  {path:'cidades/list', component: CidadesComponent  },
  //{path:'cidades/create', component: DialogElementsExample  },
  //{path:'cidades/:id', component: CidadeUpdateComponent  },
  {path:'', redirectTo: 'home', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
