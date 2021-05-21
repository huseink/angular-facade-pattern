import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop-example';
  constructor(private router: Router) {
    const activeUser = localStorage.getItem('activeUser')
    if(!activeUser) {
      this.router.navigate(['/sign-in'])
    } else {
      this.router.navigate(['/shop'])
    }
  }
}
