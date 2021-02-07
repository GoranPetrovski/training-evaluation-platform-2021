import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { levelsApi } from '../../../api/levels/levels';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training';

@Component({
  templateUrl: './update-training-dialog.component.html',
  styleUrls: ['./update-training-dialog.component.css']
})
export class UpdateTrainingDialogComponent implements OnInit {

  training: Training;

  constructor(public dialogRef: MatDialogRef<UpdateTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.training = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  levels = levelsApi;

  save() {
    this.trainingService.updateTraining(this.training.id, this.training).subscribe(training => {
      console.log("Update training ", training);
      this.dialogRef.close(training);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  //skill select combo
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our skill
    if ((value || '').trim()) {
      this.training.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill: string): void {
    const index = this.training.skills.indexOf(skill);

    if (index >= 0) {
      this.training.skills.splice(index, 1);
    }
  }
}
