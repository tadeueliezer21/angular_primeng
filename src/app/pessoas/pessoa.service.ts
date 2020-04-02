import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  findName(filtro: PessoaFiltro): Promise<any> {


    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.pessoaUrl}`, { headers, params })
      .toPromise()
      .then(response => {
        const responseJson = response;
        const pessoas = responseJson['content'];
        const resultado = {
          pessoas,
          total: response['totalElements']
        }
        return resultado;
      })
  }

  listarTodos(): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoaUrl, { headers })
      .toPromise()
      .then(response => {
        return response['content'];
      });
  }
}
