import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Books} from "./books";
import {Observable} from "rxjs";
import {environment} from "C:/Users/arsha/Book Master/bookmaster/src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  getBooksInformation(): Observable<Books[]>{
    return this.httpClient.get<Books[]>(`${environment.baseURL}books.json`);
  }
}
