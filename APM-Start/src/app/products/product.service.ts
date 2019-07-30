import {Injectable} from '@angular/core'
import{Observable, throwError} from 'rxjs';
import{catchError, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'

import {IProduct } from './product';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
}) export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
        ); 
    }

    private handleError(err: HttpErrorResponse){
        //in a real world app, we may send the server to some remote logging infraestructure
        // instead of just logging into the console
        let errorMessage = ' ';
        if(err.error instanceof ErrorEvent) {
            //A client-side or network error ocurred. Handle it accordingly.
            errorMessage = `An error ocurred: ${err.error.message}`;
        }
        else{
            //The backend returned an unsuccesful responde code.
            //The response body may contain clues as to what went wrong,
            errorMessage = `server returned code: ${err.status}, error messagem is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}