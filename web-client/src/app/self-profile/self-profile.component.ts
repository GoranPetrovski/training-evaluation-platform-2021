import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UploaderService } from '../services/uploader.service';
import { TrainingRatingService } from '../services/training-rating.service';
import { TrainingRating } from '../models/training-rate';
import { FileUploader } from '../../../node_modules/ng2-file-upload';
import { ToastNotificationService } from '../services/toast-notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-self-profile',
  templateUrl: './self-profile.component.html',
  styleUrls: ['./self-profile.component.css']
})
export class SelfProfileComponent implements OnInit {

  currentUser: User;
  trainingRate: TrainingRating[];
  public uploader: FileUploader;
  private uploadUrl: string = 'http://localhost:8080/users/uploadPicture';
  selfIcon: string;
  selfTitle: string;

  constructor(private toastNotificationService: ToastNotificationService,
    private trainingRatingService: TrainingRatingService,
    private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.getCurrentUser();
    this.trainingRatingService.getTrainingRatingsByUserId(this.currentUser.id).subscribe((trainingRate: TrainingRating[]) => {
      this.trainingRate = trainingRate;
    });
    this.selfIcon = 'person_pin';
    this.selfTitle = "Self Profile";
    //this.uploadService.uploadImage(this.currentUser.username, this.currentUser.token, this.uploader);
    const URL = `${this.uploadUrl}/${this.currentUser.username}`;
    this.uploader = new FileUploader({ url: URL, headers: [{ name: "Authorization", value: this.currentUser.token }], itemAlias: 'file' });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.toastNotificationService.showNotification(`File ${item.file.name} is successfuly upload!`);
      this.userService.retrieveUserPicture(this.currentUser.username).subscribe(res => {
        console.log("Receiving user picture res", res);
      });

    };
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

}
