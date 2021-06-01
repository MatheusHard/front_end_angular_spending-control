import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Uf } from "./uf";

@Injectable({
    providedIn: 'root'
  })
  export class UfService {
  
    private URL_BASE: string = 'http://localhost:8080/api/ufs';
    
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
   constructor(private http: HttpClient) { }
  
    getUfs(): Observable<Uf[]> {
      return this.http.get<Uf[]>(`${this.URL_BASE}`);
  
    }
}
  