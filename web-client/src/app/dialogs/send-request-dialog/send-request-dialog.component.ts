import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Training } from '../../models/training';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { TrainingRequestService } from '../../services/training-request.service';
import { TrainingRequest } from '../../models/training-request';

@Component({
  selector: 'app-delete-training-dialog',
  templateUrl: './send-request-dialog.component.html',
  styleUrls: ['./send-request-dialog.component.css']
})
export class SendRequestDialogComponent {

  training: Training;

  constructor(public dialogRef: MatDialogRef<SendRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingRequestService: TrainingRequestService,
    private toastNotificationService: ToastNotificationService) { };

  ngOnInit(): void {
    this.training = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const trainingRequest = {
      trainingId: this.training.id,
      userId: JSON.parse(localStorage.getItem('currentUser')).id,
      isCompleted: false,
      status: 'PENDING'
    };
    this.trainingRequestService.createNewTrainingRequest(trainingRequest)
      .subscribe(data => {
        this.toastNotificationService.showNotification(`The request for training ${this.training.name} is send. Please wait for approval by trainer !`);
        this.dialogRef.close(null);
      });

  }

}
