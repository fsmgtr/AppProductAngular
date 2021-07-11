import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  //função que retorna uma msg na tela do tipo snackBar do prórpio Material
  ShowMessage(msg: string, isError: boolean = false) : void {
    this.snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    });
  }

  //função para Criar Produto
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product).pipe(
     map((obj) => obj),
     catchError(e => this.errorHandler(e))
    );
  }


  errorHandler(e: any): Observable<any> {
    this.ShowMessage("Erro fatal!", true);
    return EMPTY
  }


  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  readById(id: any): Observable<Product> {
    const subUrl = `${this.url}/${id}`;
    return this.http.get<Product>(subUrl);
  }

  update(product: Product): Observable<Product> {
    const subUrl = `${this.url}/${product.id}`;
    return this.http.put<Product>(subUrl, product);
  }

  delete(id: any): Observable<any> {
    const subUrl = `${this.url}/${id}`;
    return this.http.delete<Product>(subUrl);
  }
}
