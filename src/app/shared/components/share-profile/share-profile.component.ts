import { Component, Inject } from '@angular/core';
import { TransformIcons } from 'src/app/core/TransformIcons';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-share-profile',
  templateUrl: './share-profile.component.html',
  styleUrls: ['./share-profile.component.scss']
})
export class ShareProfileComponent {
  
  message = 'Hey, You can checkout all my social profiles on Pocket!!  https://www.pocket.com';
  shareProfiles: Array<any> = new Array();
  pocketProfileUrl: string | any;

  constructor(private icons: TransformIcons, private localStorage: LocalStorageService,
     private toastr: ToastrService, @Inject(DOCUMENT) private document: Document) {
    this.displaySocialShareProfiles();
    this.pocketProfileUrl = `${this.document.location.origin}/${this.localStorage.getUserName()}`
  }



  displaySocialShareProfiles() {
    
    this.shareProfiles = 
    [
      {
        type: 'Twitter',
        message: this.message
      },
      {
        type: 'Facebook',
        message: this.message
      },
      {
        type: 'Whatsapp',
        message: this.message
      },
      {
        type: 'Reddit',
        message: this.message
      },
      {
        type: 'Email',
        message: this.message
      }
    ];  

  }

  transformIcons(type: string): string {
    return this.icons.getIcon(type.toLowerCase());
  }

  shareProfileClickHandler(type: string) {
    const profile = this.shareProfiles.find(x=>x.type === type);

    switch(profile.type)
    {
      case "Twitter":
        this.twitterShareHandler(profile.message);
        break;
      case "Whatsapp":
        this.whatsAppShareHandler(profile.message);
        break;
      case "Facebook":
        this.facebookShareHandler(profile.message);
        break;
      case "Reddit":
        this.redditShareHandler(profile.message);
        break;
      case "Email":
        this.emailHandler(profile.message);
        break;
      default :
        throw "Unspecified option";
    }

  }


  twitterShareHandler(tweetText: string) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    this.shareHandler(url);
  }

  whatsAppShareHandler(message: string) {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    this.shareHandler(url);
  }

  facebookShareHandler(message: string) {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`;
    this.shareHandler(url);
  }
  
  redditShareHandler(message: string) {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(message)}`;
    this.shareHandler(url);
  }

  emailHandler(message: string) {
    const subject = encodeURIComponent('Check out this amazing WebApp'); 
    const body = encodeURIComponent(message); 
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  }
  shareHandler(url: string) {
    window.open(url, '_blank');
  }
  
  copyToClipboard(item: any) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      if(e.clipboardData) {
        e.clipboardData.setData('text/plain', (item));
        e.preventDefault();
        this.toastr.info('Copied!!');
      } 
      document.removeEventListener('copy', (e: ClipboardEvent) => {});
    });
    document.execCommand('copy');
  }
}
