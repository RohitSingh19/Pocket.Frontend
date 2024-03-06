import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { APIResponse, UserData } from 'src/app/core/models/response.model';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStageHandler } from 'src/app/core/UserStageHandler';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private auth: AuthService, private localStorage: LocalStorageService,
         private router: Router, private toastr: ToastrService, private userStageHandler: UserStageHandler) {
    }

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
    });

    login() {
      const {email, password} = {...this.loginForm.value};
      if(email && password) {
        this.auth.login(email, password).subscribe((response: APIResponse) => {
          if(response.success) {
            const {email, token, userName, stage} = {...response.data as UserData};
            this.localStorage.saveUserInfo(token, email, userName);
            this.userStageHandler.handleStage(stage);
          } else {
            this.toastr.error(response.message);
          }
        });
      }
    }
    /*Property accessor for email*/
    get email() {
      return this.loginForm.get('email') as FormControl;
    }
}
