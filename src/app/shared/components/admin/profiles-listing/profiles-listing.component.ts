import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransformIcons } from 'src/app/core/TransformIcons';
import { APIResponse, Profile, Profiles } from 'src/app/core/models/response.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-profiles-listing',
  templateUrl: './profiles-listing.component.html',
  styleUrls: ['./profiles-listing.component.scss']
})
export class ProfilesListingComponent implements OnInit {

  profiles: Array<Profiles> = new Array();
  @Output() childEvent = new EventEmitter();
  profilesLoading: boolean = true;
  

  constructor(private profileService: ProfileService, private icons: TransformIcons) { }

  ngOnInit() {
    this.profilesLoading = true;
    this.profileService.getProfiles().subscribe((res: APIResponse) => {
      this.profilesLoading = false;
      this.profiles = res.data as Array<Profiles>;
    });
  }

  OnProfileClick(profile: Profile) {
    this.childEvent.emit(profile);
  }

  transformIcons(profile: Profile): string {
    return this.icons.getIcon(profile.name);
  }

}
