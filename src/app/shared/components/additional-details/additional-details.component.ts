import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { APIResponse, AdditionalDetails, ImageUploadResult, Profession, UserData } from 'src/app/core/models/response.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PhotoService } from '../../services/photo/photo.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-additional-details',
  templateUrl: './additional-details.component.html',
  styleUrls: ['./additional-details.component.scss']
})
export class AdditionalDetailsComponent implements OnInit {

  professionCategory: Array<string> = [];
  subCategory: Array<Profession> = [];
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  professionData: any;  
  profilePictureUrl: string;
  imageUploading: boolean = false;
  isEditMode: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;

  
  constructor(private userService: UserService, private router: Router, private toastr: ToastrService,
    config: NgbModalConfig, private modalService: NgbModal, private photoService: PhotoService,
    private route: ActivatedRoute, private localStorage: LocalStorageService) 
  {
    config.backdrop = 'static';
    config.keyboard = false;
    this.loadDefaultProfilePicture();
  }

  detailsForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    profession: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.userService.getAdditionalDetailsForCreate()
    .subscribe((resp: APIResponse) => {
        if(resp.success) {
          this.professionData = resp.data;
          this.professionCategory = Object.keys(resp.data);
        }
    })

    this.route.paramMap.subscribe((params) => {
      if (params.has('isEdit')) {
          this.isEditMode = true;
          this.activateEditMode();
      } else {
        this.isEditMode = false;
      }
    })
  }

  activateEditMode() {
    const userName = this.localStorage.getUserName();
    this.userService.getUserProfile(userName).subscribe((res) => {
        if(res.success) {
          const additionalDetails = (res.data as UserData).additionalDetails;
          this.detailsForm.patchValue({fullName: additionalDetails.fullName});
          this.detailsForm.patchValue({category: additionalDetails.category});
          this.detailsForm.patchValue({bio: additionalDetails.bio});
          this.detailsForm.patchValue({profession: additionalDetails.profession});         
          this.profilePictureUrl = additionalDetails.profilePictureUrl;
          this.onCateorySelected(additionalDetails.profession);
        }
    })
  }
  loadDefaultProfilePicture() {
    this.profilePictureUrl = '../../../../assets/profile_picture_default.png';
  }
  onCateorySelected(category: string) {
    let data = Object.entries(this.professionData);
    const searchTermLower = category.toLowerCase();
    this.selectedCategory = category;
    
    let result = data.filter((category: any) => {
      const categoryName = category[0].toLowerCase();
      return categoryName.includes(searchTermLower);
    });

    if(result && result.length > 0)
      this.subCategory = result[0][1] as Array<Profession>;

    this.detailsForm.patchValue({profession: this.selectedCategory});
  }

  onSubCateorySelected(subCat: string) {
    this.selectedSubCategory = subCat;
    this.detailsForm.patchValue({category: this.selectedSubCategory});
  }

  saveAdditionalDetails() {
    const additionalDetails = this.detailsForm.value as AdditionalDetails;
    additionalDetails.profilePictureUrl = this.profilePictureUrl;
    this.userService.saveAdditionalDetails(additionalDetails).subscribe((res: APIResponse) => {
      if(res.success) {
        this.toastr.info('Profile updated successfully!!');
        this.router.navigate(['/admin']);
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  open(content: any) {
		this.modalService.open(content, {size: 'lg'});
	}

  onRemoveProfilePicture() {
    this.loadDefaultProfilePicture();
  }
  handleFileSelection(event: any): void {
    // Handle file selection logic here
    const selectedFile = event.target.files[0];
    this.uploadImage(selectedFile);
    // Perform additional actions with the selected file if needed
  }

  uploadImage(file: File): void {
    this.imageUploading = true;
    this.photoService.uploadImage(file).subscribe((res) => {
        if(res.success) {
          const result = (res.data) as ImageUploadResult;
          if(result.url) {
            this.imageUploading = false;
            this.profilePictureUrl = result.url;
            this.modalService.dismissAll();
          }
        }
    })
  }
}
