import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { ToastNotificationService } from '../services/toast-notification.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastNotificationService: ToastNotificationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(signUpForm: NgForm) {
    console.log("Registe on Submit");
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log("On submit register", this.registerForm.value)

    this.userService.register(this.registerForm.value)
      .pipe(first()).subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log("Log error", error);
          console.log("Register error:", error.message);
          this.toastNotificationService.showNotification(error.message);
          this.registerForm.reset();
        }
      );
  }
}
