import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  create(book): Observable<Book> {
    return this.httpClient.post<Book>(this.apiServer + '/books/', JSON.stringify(book), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
  getById(id): Observable<Book> {
    return this.httpClient.get<Book>(this.apiServer + '/books/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.apiServer + '/products/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, product): Observable<Book> {
    return this.httpClient.put<Book>(this.apiServer + '/products/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id){
    return this.httpClient.delete<Book>(this.apiServer + '/products/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}