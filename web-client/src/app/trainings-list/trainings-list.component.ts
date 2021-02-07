import { Component, OnInit } from '@angular/core';
import { Training } from '../models/training';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { UpdateTrainingDialogComponent } from '../dialogs/update-training-dialog/update-training-dialog.component';
import { DeleteTrainingDialogComponent } from '../dialogs/delete-training-dialog/delete-training-dialog.component';
import { TrainingItemDialogComponent } from '../dialogs/training-item-dialog/training-item-dialog.component';
import { FilterTrainingService } from '../services/filter-trainings.service';
import { TrainingFilter } from '../interfaces/filter';
import { TrainingToggleView } from '../interfaces/toggle-view';
import { DialogWidth } from '../interfaces/dialog-width';
import { ENTER_LEAVE_ANIMATION } from '../animations/enter-leave.animation';

import { SendRequestDialogComponent } from '../dialogs/send-request-dialog/send-request-dialog.component';
import { User, ROLE } from '../models/user';


@Component({
  selector: 'app-trainings-list',
  templateUrl: './trainings-list.component.html',
  styleUrls: ['./trainings-list.component.css'],
  animations: [ENTER_LEAVE_ANIMATION]
})
export class TrainingsListComponent implements OnInit {
  dataSource: MatTableDataSource<Training>;
  levels: string[];
  trainings: Training[];
  selectedTable: boolean;
  nameFilter: string;
  levelFilter: string;
  viewTitle: string;

  constructor(public dialog: MatDialog,
    private filterTrainingService: FilterTrainingService) { }

  ngOnInit() {
    this.reloadTrainings();
    this.selectedTable = true;
    this.viewTitle = 'View Training cards';
  }

  displayedColumns = ['id', 'name', 'level', 'description', 'actions'];

  setFilteredTrainings(trFilter: TrainingFilter) {
    this.levelFilter = trFilter.level;
    this.nameFilter = trFilter.name;

    this.filterTrainingService.filterTrainings(this.nameFilter, this.levelFilter)
      .subscribe((filteredTrainings: Training[]) => {
        this.trainings = filteredTrainings;
        this.dataSource = new MatTableDataSource(filteredTrainings);
      });
  }

  previewDetailsDialog(training: Training): void {
    const { name, level, description, skills } = training;
    this.dialog.open(TrainingItemDialogComponent, {
      width: DialogWidth.previewDialog,
      data: { name, level, description, skills }
    });
  }

  createNewItem(dialogRef: any): void {
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.reloadTrainings();
    });
  }

  editDialog(training: Training): void {
    const { id, name, level, description, skills } = training;
    let dialogRef = this.dialog.open(UpdateTrainingDialogComponent, {
      width: DialogWidth.editDialog,
      data: { id, name, level, description, skills }
    });
    dialogRef.afterClosed().subscribe(() => this.reloadTrainings());
  }

  deleteDialog(id: number): void {
    let dialogRef = this.dialog.open(DeleteTrainingDialogComponent, {
      width: DialogWidth.deleteDialog,
      data: { id }
    });
    dialogRef.afterClosed().subscribe(() => this.reloadTrainings());
  }

  reloadTrainings(): void {
    this.filterTrainingService.filterTrainings(this.nameFilter, this.levelFilter)
      .subscribe((trainings: Training[]) => {
        this.dataSource = new MatTableDataSource(trainings);
        this.trainings = trainings;
      });
  }

  viewTrainingCard(tr: TrainingToggleView) {
    this.selectedTable = tr.selectedTable;
    this.viewTitle = tr.viewTitle;
  }

  sendRequestForTraining(training: Training) {
    const { id, name } = training;
    let dialogRef = this.dialog.open(SendRequestDialogComponent, {
      width: DialogWidth.deleteDialog,
      data: { id, name }
    });
    dialogRef.afterClosed().subscribe(() => this.reloadTrainings());
  }

  isAdmin(): boolean {
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role == ROLE.ADMIN;
  }

  isUser(): boolean{
    const currentUser: User = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.role == ROLE.USER;
  }
}