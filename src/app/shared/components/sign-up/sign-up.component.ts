import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { APIResponse, UserData } from 'src/app/core/models/response.model';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isEmailValid: boolean = false;
  isUserNameValid: boolean = false;
  showSpinner: boolean = false;

  ngOnInit(): void {
    this.setUpEmailCheck();
    this.setUpUserNameCheck();
  }
  
  constructor(private authService: AuthService, private userService: UserService,
            private localStorage: LocalStorageService, private router: Router, private toastr: ToastrService) {  
  }

  signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  register() {
     const {email, password, userName} = {...this.signUpForm.value};
     if(email && password && userName) {
      this.authService.register(email, password, userName).subscribe((response: APIResponse) => {
          if(response.success) {
             const {email, token, userName} = {...response.data as UserData};
             this.localStorage.saveUserInfo(token, email, userName);
             this.router.navigate(['/additional-details']);
          }
      }); 
    }
  }

  setUpEmailCheck() {
    const emailControl = this.signUpForm.get('email') as AbstractControl;
    if (emailControl) {
      emailControl.valueChanges.pipe(
      debounceTime(1000),
      ).subscribe((value) => {
        const emailValid = emailControl.valid;
        if (emailValid) {
          this.showSpinner = true;
          this.userService.isEmailRegistered(value).subscribe((response: APIResponse) => {
            this.isEmailValid = !(response.data) as boolean;
            this.showSpinner = false;
            if (response.data) {
              this.toastr.error(response.message);
              emailControl.setErrors({'invalid': true});
            }})
        } else {
          this.isEmailValid = false;
        }
      });
    };
  }

  setUpUserNameCheck() {
    const userNameControl = this.signUpForm.get('userName') as AbstractControl;
    if (userNameControl) {
      userNameControl.valueChanges.pipe(
        debounceTime(1000),
      ).subscribe((value) => {
        const userNameValid = userNameControl.valid;
        if (userNameValid) {
          this.userService.isUserNametaken(value).subscribe((response: APIResponse) => {
            this.isUserNameValid = !(response.data) as boolean;
            if (response.data) {
              this.toastr.error(response.message);
              userNameControl.setErrors({'invalid': true});
            }})
        } else {
          this.isUserNameValid = false;
        }
      });
    };
  }

  /*Property accessor for email*/
  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

   // Function to access a form control's validity
   hasError(controlName: string, error: string) {
    const control = this.signUpForm.get(controlName);
    return control && control.hasError(error) && (control.dirty || control.touched);
  }
}
