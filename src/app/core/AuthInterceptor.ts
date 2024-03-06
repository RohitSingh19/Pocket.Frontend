import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private LocalStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request should exclude the authorization token
    if (!request.headers.has('use-auth')) {
      // If 'use-auth' header is present, skip the remaining part
      return next.handle(request);
    }

    // Get the user token from local storage
    const authToken = this.LocalStorageService.getUserToken();

    // Clone the request and attach the authorization header if the token is available
    if (authToken) {
      const authRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
      return next.handle(authRequest);
    }

    // If the token is not available, proceed with the original request
    return next.handle(request);
  }
}
