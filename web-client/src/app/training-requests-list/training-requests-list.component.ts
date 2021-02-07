import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { TrainingRequest } from '../models/training-request';
import { TrainingRequestService } from '../services/training-request.service';
import { DialogWidth } from '../interfaces/dialog-width';
import { TrainingItemDialogComponent } from '../dialogs/training-item-dialog/training-item-dialog.component';

namespace STATUS {
  export const APPROVED = "APPROVED";
  export const CANCELED = "CANCELED"
}

@Component({
  selector: 'app-training-requests-list',
  templateUrl: './training-requests-list.component.html',
  styleUrls: ['./training-requests-list.component.css']
})
export class TrainingRequestsListComponent implements OnInit {

  dataSource: MatTableDataSource<TrainingRequest>;

  constructor(public dialog: MatDialog,
    private trainingRequestService: TrainingRequestService) { }

  displayedColumns = ['id', 'user', 'training', 'details', 'actions'];
  requestIcon: string;
  requestTitle: string;


  ngOnInit() {
    this.trainingRequestService.getAllTrainingRequest().subscribe((trainingRequest: any[]) => {
      this.dataSource = new MatTableDataSource(trainingRequest);
      this.requestIcon = 'more_horiz';
      this.requestTitle = 'Approved / Canceled Training requests records!';
    });

  }

  approveRequest(trainingRequest: TrainingRequest) {
    //trainingRequest.status = STATUS.APPROVED;
    this.trainingRequestService.approveTrainingRequest(trainingRequest.id).subscribe(() => {
      this.reloadTrainingRequests();
    });
  }

  cancelRequest(trainingRequest: TrainingRequest) {
    //trainingRequest.status = STATUS.CANCELED;
    this.trainingRequestService.cancelTrainingRequest(trainingRequest.id).subscribe(() => {
      this.reloadTrainingRequests();
    });
  }

  previewDetailsDialog(trainingRequest: TrainingRequest): void {
    const { name, level, description, skills } = trainingRequest.training;
    this.dialog.open(TrainingItemDialogComponent, {
      width: DialogWidth.previewDialog,
      data: { name, level, description, skills }
    });
  }

  reloadTrainingRequests() {
    this.trainingRequestService.getAllTrainingRequest().subscribe((trainingRequest: any[]) => {
      this.dataSource = new MatTableDataSource(trainingRequest);
    });
  }
}
