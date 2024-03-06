import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { API } from 'src/app/config/api';
import { ErrorHandler } from 'src/app/core/ErrorHandler';
import { APIResponse } from 'src/app/core/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private api: API, private errorHandler: ErrorHandler) { }

  login(email: string, password: string): Observable<APIResponse> {
    const body = {email, password};
    return this.http.post<APIResponse>(this.api.Auth.login, body)
    .pipe(catchError(this.errorHandler.handleError));
  }

  register(email: string, password: string, userName: string): Observable<APIResponse> {
    const body = {email, password, userName};
    return this.http.post<APIResponse>(this.api.Auth.register, body).
    pipe(catchError(this.errorHandler.handleError));
  }
}
