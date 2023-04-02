import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    console.log(`Url`, this.router);
  }

  navigateTo = () => {
    this.router.navigate(['/login']);
  };
}
