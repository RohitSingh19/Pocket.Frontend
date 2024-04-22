import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {

    constructor() {
        
    }

    handleError(error: HttpErrorResponse) {
        if(error.status == 0) {
            // this.toastr.error('An unkown error has occurred, Please try again after some time!!');
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}