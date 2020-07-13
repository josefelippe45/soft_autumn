import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//importando os componentes.
import { HomeComponent } from './views/home/home.component';
import { ProdutoComponent } from './views/produto/produto.component';
import { ProdutoCreateComponent } from './components/produto/produto-create/produto-create.component';
import { ProdutoUpdateComponent } from './components/produto/produto-update/produto-update.component';
import { ProdutoDeleteComponent } from './components/produto/produto-delete/produto-delete.component';

//adicionando as rotas da aplicação.
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "produto", component: ProdutoComponent },
  { path: "produto/create", component: ProdutoCreateComponent },
  { path: "produto/update/:id", component: ProdutoUpdateComponent },
  { path: "produto/delete/:id", component: ProdutoDeleteComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
