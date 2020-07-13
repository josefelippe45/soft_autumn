import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoService } from 'src/app/servico.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {
  form: FormGroup;
  //array para produtos
  produto: any = { id: null, nome: '', preco: '', descricao: '', quantidade: '' };


  //adiconando as rotas no nosso componente
  constructor(private fb: FormBuilder, private router: Router, private service: ServicoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //tentando trazer os dados para os campos do html
    this.form = this.fb.group({
  
      nome: this.produto.nome,
      preco: this.produto.preco,
      descricao: this.produto.descricao,
      quantidade: this.produto.quantidade
    });
    //auxilia no debug
    console.log(this.form)
    this.getProdutos();
  };
  private getProdutos() {
    this.service.getProdutos().then((response: any) => {

      console.log('Response', response);

      this.produto = response.map((ev) => {
        ev.body = ev.descricao;
        ev.header = ev.nome;
        ev.icon = 'fa-clock-o';
        return ev;
      });
      console.log(this.produto)
    });
  }
  //o metodo cancel retorna para pagina anterior.
  cancel(): void {
    this.router.navigate(['/'])
  }
  /**o metodo atualizaProduto é executado assim que o usuario clica no botão salvar
   * ele seta os dados iseridos pelo usuario e redireciona para o método 
   * updateProduto this.getProdutos exibe no console os dados do servidor
  */
  atualizaProduto() {
    const produto = {
      //o id usa o metodo get do modulo activeRoute para pegar o id da nossa url.
      id: this.route.snapshot.paramMap.get("id"),
      nome: this.produto.nome,
      preco: this.produto.preco,
      descricao: this.produto.descricao,
      quantidade: this.produto.quantidade,
    };
    //console.log que auxiliam no debug.
    console.log(this.produto[0])
    console.log(produto)
    //executa o metodo definido no nosso serviço e retorna um request get dos produtos
    this.service.updateProduto(produto).then(() => {
      this.getProdutos();
      this.router.navigate(['/']);
    });

  }
}
