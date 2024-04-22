import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdditionalDetails, PocketProfile, Profile, UserData } from 'src/app/core/models/response.model';
import { ProfileService } from '../../services/profile/profile.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { UserService } from '../../services/user/user.service';
import { TransformIcons } from 'src/app/core/TransformIcons';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AdminComponent implements OnInit {
  
  receivedProfileItem: Profile | any;
  profiles: Array<Profile> = new Array();
  userData: UserData;
  userPrimaryDetails: AdditionalDetails;
  userName: string | any;
  profilesLoading : boolean = false;
  profileLoadingMessage: string;
  profilesForPreview: Array<Profile> = new Array();
  appURL: string;
  profileSelectedForDelete: Profile;


  constructor(config: NgbModalConfig, private modalService: NgbModal, private localStorage: LocalStorageService,
       private profileService: ProfileService, private userService: UserService, private icons: TransformIcons,
       private router: Router, @Inject(DOCUMENT) private document: Document) 
  {
		config.backdrop = 'static';
		config.keyboard = false;
	}

  ngOnInit(): void {
    this.userName = this.localStorage.getUserName();
    this.userService.getUserProfile(this.userName).subscribe((res) => {
      this.userData = (res.data as UserData);
      this.userPrimaryDetails = this.userData.additionalDetails;
      this.loadPocketProfile(this.userName);
      this.appURL = this.document.location.origin;
    });
  }

	open(content: any) {
		this.modalService.open(content, {size: 'lg'});
	}

  receiveMessage($event: any) {
    this.receivedProfileItem = $event as Profile;
    this.modalService.dismissAll();
  }

  transformIcons(profile: Profile): string {
    return this.icons.getIcon(profile.name);
  }

  onProfileEditClick(profile: Profile) {
    this.profileService.setProfileForEdit(profile);
  }

  onProfileDeleteClick(profile: Profile) {
    this.profileService.deletePocketProfile(this.userName, profile.name).subscribe(res => {
      if(res.success) {
          this.profiles = this.profiles.filter((p) => p.name !== profile.name);
          this.profileService.setProfilesForPreview(this.profiles);
          // this.toastr.success('Profile deleted successfully!!');
      } else {
        // this.toastr.error('Unable to delete profile, Pls try again after some time!!');
      }
    })
  }

  loadPocketProfile(userName: string | null) {
    this.profilesLoading = true;
    this.profileService.getPocketProfile(userName).subscribe((res) => {
      this.profiles = (res.data as PocketProfile).profiles;
      this.profilesLoading = false;
      this.profileService.setProfilesForPreview(this.profiles);
    });
  }

  reloadProfiles() {
    this.loadPocketProfile(this.userName);
  }

  logout() {
    this.localStorage.clearUserInfo();
    this.router.navigate(['/login']);
  }

  navigateForEdit() {
    this.router.navigate(['/additional-details', {isEdit: true}]);
  }
  
}
