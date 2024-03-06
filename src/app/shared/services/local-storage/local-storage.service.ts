import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly TOKEN_KEY = 'user_token';
  private readonly EMAIL_KEY = 'user_email';
  private readonly USER_NAME = 'user_name';

  constructor() { }

  // Save user information to local storage
  saveUserInfo(token: string, email: string, userName: string): void {
    this.clearUserInfo();
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.USER_NAME, userName);
  }

  // Get user token from local storage
  getUserToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get user email from local storage
  getUserEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  // Get user name from local storage
  getUserName(): string | null {
    return localStorage.getItem(this.USER_NAME);
  }
  // Remove user information from local storage (logout)
  clearUserInfo(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.USER_NAME);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getUserToken();
  }
}
