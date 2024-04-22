import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from 'src/app/core/models/response.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'app-pocket-preview',
  templateUrl: './pocket-preview.component.html',
  styleUrls: ['./pocket-preview.component.css']
})
export class PocketPreviewComponent implements OnInit {
  
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    // this.profileService.selectedProfile.subscribe((profile) => {
    //   if(profile) {
    //       this.profileItems.push((profile as Profile));
    //   }
    // });
  }

  onPocketItemClick(profile: Profile) {
    alert(profile.baseUrl);
    this.profileService.setProfileForEdit(profile);
  }

  reloadProfiles() {
    console.log('Reload');
  }
}
