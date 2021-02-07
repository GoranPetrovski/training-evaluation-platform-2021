import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ROLE, User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'Training evaluation platform';
  currentUser: User;
  currUserInfo: string;

  defaultLanguage = 'en';

  constructor(private authService: AuthenticationService,
    private translate: TranslateService) { };

  ngOnInit(): void {
    this.translate.use(this.defaultLanguage);
    this.currentUser = this.getCurrentUser();

  }

  logout() {
    this.currentUser = null;
    this.currUserInfo = '';
    return this.authService.logout();
  }

  getCurrentUser(): User {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.currUserInfo = user? `${user.firstname} ${user.lastname} [ ${user.role} ]`: '';
    return user;
  }

  isAuthenticated() {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = this.getCurrentUser();
    return currentUser != null;
  }

  isRoleUser(): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role === ROLE.USER;
  }

  isRoleTrainer(): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role === ROLE.TRAINER;
  }

  isRoleAdmin(): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role === ROLE.ADMIN;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}