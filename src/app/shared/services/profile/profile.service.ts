import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from 'src/app/config/api';
import { APIResponse, Profile } from 'src/app/core/models/response.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  private profile = new BehaviorSubject<Profile | null>(null);
  selectedProfile = this.profile.asObservable();

  private profileForEdit = new BehaviorSubject<Profile | null>(null);
  selectedProfileForEdit = this.profileForEdit.asObservable();

  private profilesForPreview = new BehaviorSubject<Array<Profile> | null>(null);
  SelectedProfilesForPreview = this.profilesForPreview.asObservable();


  constructor(private httpClient: HttpClient, private api: API) { 
  }

  getProfiles(): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(this.api.profile.getProfiles, {headers:{'use-auth':'true'}});
  }

  setProfileForPreview(p: Profile) {
    this.profile.next(p);
  }

  setProfileForEdit(p: Profile) {
    this.profileForEdit.next(p);
  }

  setProfilesForPreview(profiles: Profile[]) {
    this.profilesForPreview.next(profiles);
  }  

  saveProfileInDB(p: Profile, userName: string): Observable<APIResponse> {
    const body = {profileId: p.id, userName: p.profileUserName};
    return this.httpClient.post<APIResponse>(`${this.api.profile.saveProfile}/?userName=${userName}`,
    body,{headers:{'use-auth':'true'}});
  }

  getPocketProfile(userName: string | any): Observable<APIResponse> {
    return this.httpClient.get<APIResponse>(`${this.api.profile.getPocketProfile}/?userName=${userName}`, 
    {headers:{'use-auth':'true'}});
  }

  updatePocketProfile(p: Profile, userName: string): Observable<APIResponse> {
    const body = {ProfileUserName: p.profileUserName, ProfileName: p.name, IsVisibleToOthers: p.isVisibleToOthers};
    return this.httpClient.put<APIResponse>(`${this.api.profile.updatePocketProfile}/?userName=${userName}`,body, 
    {headers:{'use-auth':'true'}});
  }
  
  deletePocketProfile(userName: string, profileName: string) {
    return this.httpClient.delete<APIResponse>(`${this.api.profile.deletePocketProfile}/?userName=${userName}&profileName=${profileName}`, {headers:{'use-auth':'true'}});
  }
}
