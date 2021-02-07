import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Skill } from '../../models/skill';
import { skillsApi } from '../../../api/skills/skills';

@Component({
  selector: 'app-training-item-dialog',
  templateUrl: './training-item-dialog.component.html',
  styleUrls: ['./training-item-dialog.component.css']
})
export class TrainingItemDialogComponent implements OnInit {

  skills: Skill[];
  constructor(public dialogRef: MatDialogRef<TrainingItemDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    
  }
}
