import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { API } from 'src/app/config/api';
import { APIResponse, AdditionalDetails } from 'src/app/core/models/response.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { ErrorHandler } from 'src/app/core/ErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private errorHandler: ErrorHandler, private http: HttpClient, private api: API, private localSotarge: LocalStorageService) { }

  isEmailRegistered(email: string | null): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.api.User.isUserEmailTaken}/?email=${email}`, {headers:{'use-auth':'false'}})
    .pipe(catchError(this.errorHandler.handleError));
  }  
  
  isUserNametaken(userName: string | null): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.api.User.isUserNameTaken}/?userName=${userName}`, {headers:{'use-auth':'false'}})
    .pipe(catchError(this.errorHandler.handleError));
  }

  getAdditionalDetailsForCreate(): Observable<APIResponse> {
    return this.http.get<APIResponse>(this.api.User.getAllProfessions, {headers:{'use-auth':'true'}})
    .pipe(catchError(this.errorHandler.handleError));
  }

  saveAdditionalDetails(additionalDetails: AdditionalDetails): Observable<APIResponse> {
    const body = additionalDetails;
    const email = this.localSotarge.getUserEmail();
    return this.http.post<APIResponse>(`${this.api.User.saveAdditionalDetails}/?email=${email}`, body, {headers:{'use-auth':'true'}})
    .pipe(catchError(this.errorHandler.handleError));
  }

  getUserProfile(userName: string | null): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.api.User.getUserDetail}/?userName=${userName}`, {headers:{'use-auth':'false'}})
    .pipe(catchError(this.errorHandler.handleError));
  }
  
}