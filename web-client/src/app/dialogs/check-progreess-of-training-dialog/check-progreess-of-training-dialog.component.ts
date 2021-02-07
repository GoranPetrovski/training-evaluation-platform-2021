import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastNotificationService } from '../../services/toast-notification.service';
import { TrainingRequest } from '../../models/training-request';
import { TrainingRequestService } from '../../services/training-request.service';

@Component({
  selector: 'check-progreess-of-training-dialog',
  templateUrl: './check-progreess-of-training-dialog.component.html',
  styleUrls: ['./check-progreess-of-training-dialog.component.css']
})
export class CheckProgressOfTrainingDialogComponent {

  trainingRequest: TrainingRequest;

  constructor(public dialogRef: MatDialogRef<CheckProgressOfTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingRequestService: TrainingRequestService,
    private toastNotificationService: ToastNotificationService) { };

  ngOnInit(): void {
    this.trainingRequest = this.data.trainingRequest;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  complete(): void {
    this.trainingRequestService.completeTrainingRequest(this.trainingRequest.id).subscribe(() => {
      this.toastNotificationService.showNotification(`All training skills for ${this.trainingRequest.training.name} are completed!`);
      this.dialogRef.close(null);
    });
  }

}
