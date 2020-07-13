import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  constructor(private service: ServicoService, private router: Router, private route: ActivatedRoute) { }
  //array para produtos
  produto = { nome: '', preco: '', descricao: '', quantidade: '' };
  ngOnInit(): void {
  }
  //trazendo os produtos
  private getProdutos() {
    this.service.getProdutos().then((response: any) => {

      console.log('Response', response);

      this.produto = response.map((ev) => {
        ev.body = ev.descricao;
        ev.header = ev.nome;
        ev.icon = 'fa-clock-o';
        return ev;
      });
    });
  }
  deleteProduto() {
    const produto = {
      //o id usa o metodo get do modulo activeRoute para pegar o id da nossa url.
      id: this.route.snapshot.paramMap.get("id"),
    }
    //executa o metodo do service utilizando o parametro pego na const produto
    this.service.deleteProduto(produto).then(() =>{
      this.getProdutos();
      alert('Produto deletado!');
      this.router.navigate(['/']);
    })
    

  }
  cancel() {
    this.router.navigate(['/']);
  }

}
