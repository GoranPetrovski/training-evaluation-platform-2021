import { Routes, RouterModule } from "@angular/router";

import { TrainingsListComponent } from "./trainings-list/trainings-list.component";
import { AuthGuard } from "./security/auth-guard";
import { LoginComponent } from "./login/login.component";
import { RegisterUserComponent } from "./register-user/register-user.component";
import { UsersComponent } from "./users/users.component";
import { HomeComponent } from "./home/home.component";
import { SelfProfileComponent } from "./self-profile/self-profile.component";
import { ApprovedTrainingRequestsComponent } from "./approved-training-requests/approved-training-requests.component";
import { TrainingRequestsListComponent } from "./training-requests-list/training-requests-list.component";
import { TrainingRatingListComponent } from "./training-rating-list/training-rating-list.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'trainings', component: TrainingsListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'self-profile', component: SelfProfileComponent },
    { path: 'training-requests', component: ApprovedTrainingRequestsComponent, canActivate: [AuthGuard] },
    { path: 'requests-list', component: TrainingRequestsListComponent, canActivate: [AuthGuard] },
    { path: 'rate-trainings', component: TrainingRatingListComponent, canActivate: [AuthGuard] },

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);