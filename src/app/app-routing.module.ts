import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { AdditionalDetailsComponent } from './shared/components/additional-details/additional-details.component';
import { AdminComponent } from './shared/components/admin/admin.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'additional-details', component: AdditionalDetailsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'profile/:userName', component: ProfileComponent},
  {path: ':userName', component: AppComponent},
  {
    path        : '**',
    pathMatch   : 'full',
    component   : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
