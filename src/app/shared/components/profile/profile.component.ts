import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { PocketProfile, Profile, UserData } from 'src/app/core/models/response.model';
import { ProfileService } from '../../services/profile/profile.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { TransformIcons } from 'src/app/core/TransformIcons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName: string | any;
  userData: UserData;
  profiles: Array<Profile> = new Array();
  isProfileLoadingFromAdmin: boolean = true;

  constructor(private route: ActivatedRoute, private userService: UserService, private config: NgbModalConfig,
    private profileService: ProfileService, private localStorage: LocalStorageService,
    private icons: TransformIcons, private modalService: NgbModal) {

    this.route.paramMap.subscribe((params) => {
      if (params.has('userName')) {
        this.isProfileLoadingFromAdmin = false;
        this.userName = params.get('userName');
      } 
    })

    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    const userName = this.isProfileLoadingFromAdmin ? this.localStorage.getUserName() : this.userName;
    this.loadPrimaryInformation(userName).subscribe(response => {
      if (response.success) {
        const data = (response.data) as UserData;
        if (!data) {
          //no data found for the profile name
          return;
        }
        this.userData = data;
        //loading profiles for user
        this.loadPocketProfiles(userName);
      }

    });
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  loadPrimaryInformation(userName: string) {
    return this.userService.getUserProfile(userName);
  }

  loadPocketProfiles(userName: string) {
    if (this.isProfileLoadingFromAdmin) {
      this.loadPocketProfilesFromAdmin();
    } else {
      this.loadPocketProfilesFromDB(userName);
    }

  }

  loadPocketProfilesFromDB(userName: string) {
    this.profileService.getPocketProfile(userName).subscribe((res) => {
      if (res.success) {
        this.profiles = ((res.data) as PocketProfile).profiles;
      }
    })
  }

  loadPocketProfilesFromAdmin() {
    this.profileService.SelectedProfilesForPreview.subscribe((profiles) => {
      if (profiles) {
        this.profiles = profiles;
      }
    });
  }

  transformIcons(profile: Profile): string {
    return this.icons.getIcon(profile.name);
  }

  navigateToUserProfile(profile: Profile) {
    window.open(profile.baseUrl + profile.profileUserName, '_blank');
  }


}
