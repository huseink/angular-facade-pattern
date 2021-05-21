import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userNotFound = false;

  signInForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSignIn() {
    const username = this.signInForm.controls.userName.value;
    const password = this.signInForm.controls.password.value;
    const user = new User(username, password)
    this.userService.signIn(user).subscribe((data) => {
      if(!data.username) {
        this.userNotFound = true;
      } else {
        localStorage.setItem('activeUser', JSON.stringify(data))
        this.router.navigate(['/shop'])
      }
    })
  }

}
