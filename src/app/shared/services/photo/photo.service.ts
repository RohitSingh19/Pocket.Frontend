import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/config/api';
import { APIResponse } from 'src/app/core/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private api: API) { }

  uploadImage(file: File): Observable<APIResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<APIResponse>(this.api.photo.savePhoto, formData, {headers:{'use-auth':'true'}});
  }
}
