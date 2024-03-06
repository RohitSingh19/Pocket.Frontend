import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TransformIcons {
    
    getIcon(name: string): string {
        return `./../../../../../assets/icons/${name.toLowerCase()}.png`;
    }
}