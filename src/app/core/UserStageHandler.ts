import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export enum UserProfileStages {
    LoginStage = 0,
    AdditionalDetailsStage = 1,
    ActiveStage = 2,
    DeactiveStage = 3,
}

@Injectable({
    providedIn: 'root'
})
export class UserStageHandler {
    
    constructor(private router: Router) {}

    handleStage(stage: number) {
        switch(stage)
        {
            case UserProfileStages.AdditionalDetailsStage:
                this.router.navigate(['/additional-details']);
                break;
            case UserProfileStages.ActiveStage:
                this.router.navigate(['/admin']);
                break;
            case UserProfileStages.DeactiveStage:
                this.router.navigate(['/TO-BE-IMPLEMENTED']);
        }
        
    }
}