import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainingsListComponent } from './trainings-list/trainings-list.component';
import { DeleteTrainingDialogComponent } from './dialogs/delete-training-dialog/delete-training-dialog.component';
import { TrainingItemDialogComponent } from './dialogs/training-item-dialog/training-item-dialog.component';
import { UpdateTrainingDialogComponent } from './dialogs/update-training-dialog/update-training-dialog.component';
import { AddNewTrainingDialogComponent } from './dialogs/add-new-training-dialog/add-new-training-dialog.component';
import { TrainingService } from './services/training.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrainingCardComponent } from './training-card/training-card.component';
import { FilterTrainingService } from './services/filter-trainings.service';
import { FilterTrainingsComponent } from './filter-trainings/filter-trainings.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './security/auth-guard';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';
import { routing } from './app.routing';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserService } from './services/user.service';
import { UsersComponent } from './users/users.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { StarRatingModule } from 'angular-star-rating';
import { SendRequestDialogComponent } from './dialogs/send-request-dialog/send-request-dialog.component';
import { ToastNotificationService } from './services/toast-notification.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { SelfProfileComponent } from './self-profile/self-profile.component';
import { UploaderService } from './services/uploader.service';
import { TrainingRequestService } from './services/training-request.service';
import { TrainingRequestCardComponent } from './training-request-card/training-request-card.component';
import { CheckProgressOfTrainingDialogComponent } from './dialogs/check-progreess-of-training-dialog/check-progreess-of-training-dialog.component';
import { ApprovedTrainingRequestsComponent } from './approved-training-requests/approved-training-requests.component';
import { TrainingRequestsListComponent } from './training-requests-list/training-requests-list.component';
import { TrainingRatingService } from './services/training-rating.service';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { TrainingRatingListComponent } from './training-rating-list/training-rating-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainingsListComponent,
    UpdateTrainingDialogComponent,
    DeleteTrainingDialogComponent,
    TrainingItemDialogComponent,
    AddNewTrainingDialogComponent,
    SendRequestDialogComponent,
    CheckProgressOfTrainingDialogComponent,
    TrainingCardComponent,
    FilterTrainingsComponent,
    LoginComponent,
    RegisterUserComponent,
    UsersComponent,
    HomeComponent,
    FileSelectDirective,
    SelfProfileComponent,
    ApprovedTrainingRequestsComponent,
    TrainingRequestCardComponent,
    TrainingRequestsListComponent,
    HeaderTitleComponent,
    TrainingRatingListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    StarRatingModule.forRoot(),

    NgbModule.forRoot()
  ],
  entryComponents: [
    UpdateTrainingDialogComponent,
    DeleteTrainingDialogComponent,
    TrainingItemDialogComponent,
    AddNewTrainingDialogComponent,
    SendRequestDialogComponent,
    CheckProgressOfTrainingDialogComponent
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    TrainingService,
    FilterTrainingService,
    UserService,
    ToastNotificationService,
    UploaderService,
    TrainingRequestService,
    TrainingRatingService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
