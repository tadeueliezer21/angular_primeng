import { Component, OnInit } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  pessoas = [];

  ngOnInit() {
  }

  constructor(private pessoaService: PessoaService) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.findForName(pagina);
  }

  findForName(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.findName(this.filtro).then(resultado => {
      this.totalRegistros = resultado.total
      this.pessoas = resultado.pessoas
    });
  }

}
