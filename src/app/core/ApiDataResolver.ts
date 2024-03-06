import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { APIResponse } from "./models/response.model";
import { Injectable } from "@angular/core";
import { ProfileService } from "../shared/services/profile/profile.service";
import { Observable } from "rxjs";
import { LocalStorageService } from "../shared/services/local-storage/local-storage.service";


@Injectable({
    providedIn: 'root'
})
export class ApiDataResolve implements Resolve<APIResponse> {  
    
    constructor(private profileService: ProfileService, private localStorage: LocalStorageService) {}  
    
    resolve(route: ActivatedRouteSnapshot): Observable<APIResponse> {  
      const userName = this.localStorage.getUserName();
      return this.profileService.getPocketProfile(userName);  
    }  
  }  