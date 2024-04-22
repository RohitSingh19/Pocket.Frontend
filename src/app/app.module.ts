import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';


import { API } from './config/api';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';
import { AdditionalDetailsComponent } from './shared/components/additional-details/additional-details.component';
import { AuthInterceptor } from './core/AuthInterceptor';
import { AdminComponent } from './shared/components/admin/admin.component';
import { HeaderComponent } from './shared/components/admin/header/header.component';
import { ProfilesListingComponent } from './shared/components/admin/profiles-listing/profiles-listing.component';
import { ProfileItemComponent } from './shared/components/admin/profile-item/profile-item.component';
import { PocketPreviewComponent } from './shared/components/admin/pocket-preview/pocket-preview.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ShareProfileComponent } from './shared/components/share-profile/share-profile.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AdditionalDetailsComponent,
    AdminComponent,
    HeaderComponent,
    ProfilesListingComponent,
    ProfileItemComponent,
    PocketPreviewComponent,
    ProfileComponent,
    ShareProfileComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule, 
    // ToastrModule.forRoot(
    //   {
    //     positionClass: 'toast-bottom-right',
    //     preventDuplicates: true,
    //   }
    // ),
    LoadingBarHttpClientModule 
  ],
  providers: [API, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
