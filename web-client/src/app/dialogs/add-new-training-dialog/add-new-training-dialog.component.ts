import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA, MatChipInputEvent } from '@angular/material';
import { levelsApi } from '../../../api/levels/levels';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-training-dialog',
  templateUrl: './add-new-training-dialog.component.html',
  styleUrls: ['./add-new-training-dialog.component.css']
})
export class AddNewTrainingDialogComponent implements OnInit {

  training: Training;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private dialogRef: MatDialogRef<AddNewTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingService: TrainingService) { }

  levels: string[];
  skills: string[];

  ngOnInit(): void {
    this.training = new Training();
    this.skills = [];
    this.levels = levelsApi;
  }


  name = new FormControl('', [Validators.required]);
  level = new FormControl('', [Validators.required]);

  getErrorMessage(paramName: string) {
    return this.name.hasError('required') ? `You must enter a ${paramName}` : '';
  }

  save() {
    console.log("Add new save btn", this.training);
    this.training.skills = this.skills;
    this.trainingService.createNewTraining(this.training).subscribe(training => {
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
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
