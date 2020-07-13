import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

//essa const recebe a url do nosso servidor
const baseUrl = 'http://localhost:8080/products/';
@Injectable({
  providedIn: 'root'
})

export class ServicoService {

  //adicionamos o http client ao nosso contrutor pois ele sera de grande ajuda nos request.
  constructor(private http: HttpClient) { }
 //usado para testar com retorno json. auxilia no debug.
 httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
 //request para o servidor do backend retorna uma promise com o acesso
   private async request(method: string, url: string, data?: any) {
     const result = this.http.request(method, url, {
       body: data,
       responseType: 'json',
       observe: 'body',
     }); 
     return new Promise((resolve, reject) => {
       result.subscribe(resolve, reject);
     });
   }
   //Aqui está os request do Crud, feitos de forma similar ao postman
   //pega todos os produtos
   getProdutos() {
     return this.request('GET', `${baseUrl}`);
   }
   //pega um produto a partir do parametro produto que recebe o id
   getProdutoById(produto) {
    return this.request('GET', `${baseUrl}${produto.id}`);
  }
  //cria um produto
   createProduto(produto) {
     //é feita uma concatenação da string
     return this.request('POST', `${baseUrl}`, produto);
   }
   //atualiza um produto a partir do parametro produto que recebe o id
   updateProduto(produto) {
     return this.request('PUT', `${baseUrl}${produto.id}`,produto);
   }
   //deleta um produto a partir do parametro produto que recebe o id
   deleteProduto(produto) {
     return this.request('DELETE', `${baseUrl}${produto.id}`);
   }
 }
