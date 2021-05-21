import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  createWasSuccessful = false;
  
  signUpForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  registerAccount() {
    const username = this.signUpForm.controls.userName.value;
    const password = this.signUpForm.controls.password.value;
    const user = new User(username, password)
    this.userService.createUser(user).subscribe((data) => {
      if(data.includes('added')) {
        this.createWasSuccessful = true;
      } 
    })
  }

}
