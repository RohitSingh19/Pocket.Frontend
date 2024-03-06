import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/core/models/response.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss']
})
export class ProfileItemComponent implements OnInit{
  
  @Input() profileItem: Profile | any;
  @Output() reloadProfilesEvent = new EventEmitter();
  profiles: Array<Profile> = new Array();
  profileUserName: string | any;
  isEditMode: boolean = false;
  isToggled:boolean = true;
  userName: string | any;

  constructor(private profileService: ProfileService,
           private localStorageService: LocalStorageService, private toastr: ToastrService) {
    
  };
  
  ngOnInit(): void {
    this.isEditMode = false;
    this.userName = this.localStorageService.getUserName();
    this.profileService.selectedProfileForEdit.subscribe((res) => {
      if(res) {
        let profileItem: Profile = {...res as Profile};
        this.profileItem = profileItem;
        this.profileUserName = profileItem.profileUserName;
        this.isEditMode = true;
      };
    });
  }

  toggleButton() {
    this.isToggled = !this.isToggled;
  }


  onAddEditProfileItem() {

    if(this.isEditMode) {
      this.editPocketProfile();
    } else {
        this.addPocketProfile();
    }
    
    this.clearProfileItemFromUI();
    this.profileUserName = null;
  }

  addPocketProfile() {
    let profileItem: Profile = {...this.profileItem as Profile};
    profileItem.profileUserName = this.profileUserName;
    
    if(!this.isProfileAlreadyAdded(profileItem.id)) {
      this.saveProfileInDb(profileItem).subscribe((res) => {
        if(res.success) {
            this.toastr.info(`${profileItem.name} added in your pocket successfully!!`);
            this.addProfile(profileItem);
            this.reloadProfilesInAdmin();
        }
      });
    } else {
      this.toastr.info('Profile already included');
    }
  }
  
  editPocketProfile() {
    this.profileItem.profileUserName = this.profileUserName;
    this.profileService.updatePocketProfile(this.profileItem, this.userName).subscribe((res) => {
      this.toastr.info(`Profile Updated Successfully!!`);
      this.reloadProfilesInAdmin();
    })
  }

  addProfile(profileItem: Profile) {
    this.profiles.push(profileItem);
    this.profileService.setProfileForPreview(profileItem);
  }


  isProfileAlreadyAdded(id: Number):boolean {
    return this.profiles.some(x=> x.id === id);
  }

  saveProfileInDb(profileItem: Profile) {
    return this.profileService.saveProfileInDB(profileItem, this.userName);
  }

  reloadProfilesInAdmin() {
    this.reloadProfilesEvent.emit();
  }

  clearProfileItemFromUI() {
    this.profileItem = null;
  }
  
  cancelClickHandler() {
    this.clearProfileItemFromUI();
  }
}
