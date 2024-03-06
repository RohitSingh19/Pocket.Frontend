import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pocket.Frontend';

  constructor(private activatedRoute: ActivatedRoute, private route: Router) {
    this.activatedRoute.paramMap.subscribe((params) => {
      if(params.has('userName')) {
          this.route.navigate(['/profile', params.get('userName')]);
      }
    })
  }
}
