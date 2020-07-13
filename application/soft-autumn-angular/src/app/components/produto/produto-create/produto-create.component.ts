import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoService } from 'src/app/servico.service';



@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  //array para produtos
  produto = { nome: '', preco: '', descricao: '', quantidade: '' };


  //adiconando as rotas no nosso componente
  constructor(private router: Router, private service: ServicoService) { }


  ngOnInit(): void {

  }
  //adicionando métodos do nosso componente
  //o metodo cancel retorna para pagina anterior.
  cancel(): void {
    this.router.navigate(['/'])
  }
  //o metodo getProdutos é responsavel por pegar os dados do nosso servidor
  private getProdutos() {
    this.service.getProdutos().then((response: any) => {
      //retorna os dados do servido no console. ajuda no debug.
      console.log('Response', response);

      this.produto = response.map((ev) => {
        ev.body = ev.descricao;
        ev.header = ev.nome;
        ev.icon = 'fa-clock-o';
        return ev;
      });
    });
  }


  /**o metodo createProduto é executado assim que o usuario clica no botão salvar
   * ele seta os dados iseridos pelo usuario e redireciona para o método 
   * createProduto this.getProdutos exibe no console os dados do servidor
  */
  createProduto(): void {
    const produto = {
      nome: this.produto.nome,
      preco: this.produto.preco,
      descricao: this.produto.descricao,
      quantidade: this.produto.quantidade,
    };
    this.service.createProduto(produto);
    this.getProdutos();
  }
}

