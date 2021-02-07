import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-delete-training-dialog',
  templateUrl: './delete-training-dialog.component.html',
  styleUrls: ['./delete-training-dialog.component.css']
})
export class DeleteTrainingDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingService: TrainingService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    console.log("Confirm", this.data.id);
    this.trainingService.deleteTraining(this.data.id).subscribe(() => {
      this.dialogRef.close(null);   
    });
  }

}
