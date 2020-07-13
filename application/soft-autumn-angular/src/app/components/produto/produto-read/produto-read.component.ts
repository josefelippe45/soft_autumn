import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {
  //carrega os elementos inseridos pelo usuario.
  produtos: any =[];
  //adicionamos o servico ao nosso contrutor para utilizar seus metodos
  constructor(private service: ServicoService) { }


  ngOnInit() {
    //carrega os produtos do nosso metodo
    this.getProdutos();
  }
  //carrega os dados do servidor
  private getProdutos() {
    this.service.getProdutos().then((response: any) => {

      console.log('Response', response);

      this.produtos = response.map((ev) => {
        ev.body = ev.descricao;
        ev.header = ev.nome;
        ev.icon = 'fa-clock-o';
        return ev;
      });
      //auxilia no debug
      console.log('data do banco', this.produtos)
    });
  }


}
