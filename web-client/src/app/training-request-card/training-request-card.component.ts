import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainingRequest } from '../models/training-request';

@Component({
  selector: 'app-training-request-card',
  templateUrl: './training-request-card.component.html',
  styleUrls: ['./training-request-card.component.css']
})
export class TrainingRequestCardComponent implements OnInit {

  @Input() trainingRequest: TrainingRequest;

  @Output()
  previewDetailsClick: EventEmitter<TrainingRequest> = new EventEmitter<TrainingRequest>();

  @Output()
  giveProgressBtnClick: EventEmitter<TrainingRequest> = new EventEmitter<TrainingRequest>();

  constructor() { }

  ngOnInit() {
    console.log("Training request in init ", this.trainingRequest)
  }

  previewDetails() {
    this.previewDetailsClick.emit(this.trainingRequest);
  }

  giveProgress() {
    this.giveProgressBtnClick.emit(this.trainingRequest);
  }

}
