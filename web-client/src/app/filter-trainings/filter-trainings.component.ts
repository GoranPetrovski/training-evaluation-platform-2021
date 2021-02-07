import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { levelsApi } from '../../api/levels/levels';
import { AddNewTrainingDialogComponent } from '../dialogs/add-new-training-dialog/add-new-training-dialog.component';
import { TrainingToggleView } from '../interfaces/toggle-view';
import { TrainingFilter } from '../interfaces/filter';
import { User, ROLE } from '../models/user';

const ALL_LEVELS: string = 'All levels';

@Component({
  selector: 'filter-trainings',
  templateUrl: './filter-trainings.component.html',
  styleUrls: ['./filter-trainings.component.css']
})
export class FilterTrainingsComponent implements OnInit {
  levels: string[];
  selectedTable: boolean;
  nameFilter: string;
  levelFilter: string;
  viewTitle: string;

  @Output()
  createNewTrainingClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  toogleBtnClicked: EventEmitter<TrainingToggleView> = new EventEmitter<TrainingToggleView>();

  @Output()
  levelFilterSelected: EventEmitter<TrainingFilter> = new EventEmitter<TrainingFilter>();

  @Output()
  nameFilterInput: EventEmitter<TrainingFilter> = new EventEmitter<TrainingFilter>();

  constructor(public dialog: MatDialog) {
    this.levels = [ALL_LEVELS].concat(levelsApi);
    this.selectedTable = true;
    this.nameFilter = '';
    this.levelFilter = ALL_LEVELS;
    this.viewTitle = 'View Training cards';
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    this.nameFilterInput.emit({ name: this.nameFilter, level: this.levelFilter });
  }

  selectedLevel(filterLevel: string) {
    this.levelFilter = filterLevel;
    this.levelFilterSelected.emit({ name: this.nameFilter, level: this.levelFilter });
  }

  createNewItem() {
    let dialogRef = this.dialog.open(AddNewTrainingDialogComponent, {
      width: '510px',
    });
    this.createNewTrainingClick.emit(dialogRef);
  }

  viewTrainingCard() {
    this.selectedTable = !this.selectedTable;
    this.selectedTable ? this.viewTitle = 'Card view of training records' : this.viewTitle = 'Table view of training records';
    this.toogleBtnClicked.emit({ selectedTable: this.selectedTable, viewTitle: this.viewTitle })
  }

  isUserRoleTrainer(): boolean{
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role == ROLE.TRAINER; 
  }
}
