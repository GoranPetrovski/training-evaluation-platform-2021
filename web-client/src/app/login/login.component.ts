import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastNotificationService } from '../services/toast-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastNotificationService: ToastNotificationService) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(signInForm: NgForm) {
    if (signInForm.valid) {
      this.submitting = true;

      return this.authenticationService.login(signInForm.value.username, signInForm.value.password)
        .subscribe((response: HttpResponse<any>) => {
          const authToken = this.getAuthToken(response);
          this.saveUserToStorage(signInForm.value.username, authToken);
        }, error => {
          this.submitting = false;
          this.toastNotificationService.showNotification(error.message);
        });
    }
  }


  getAuthToken(response: HttpResponse<any>) {
    return response.headers.get('Authorization');
  }

  saveUserToStorage(username: string, token: string) {
    return this.userService.getByUsername(username, token).subscribe((user: User) => {
      user.token = token;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/authenticated']);
    });
  }

  extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
