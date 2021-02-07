import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Training } from '../models/training';

@Component({
  selector: 'app-training-card',
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.css']
})
export class TrainingCardComponent implements OnInit {
  @Input() training: Training;

  @Output()
  previewDetailsClick: EventEmitter<Training> = new EventEmitter<Training>();

  @Output()
  editBtnClick: EventEmitter<Training> = new EventEmitter<Training>();

  @Output()
  deleteBtnClick: EventEmitter<Number> = new EventEmitter<Number>();

  @Output()
  sendRequestBtnClick: EventEmitter<Training> = new EventEmitter<Training>();

  constructor() { }

  ngOnInit() {
  }

  previewDetails() {
    this.previewDetailsClick.emit(this.training);
  }

  editDialog() {
    this.editBtnClick.emit(this.training);
  }

  deleteDialog() {
    this.deleteBtnClick.emit(this.training.id);
  }

  sendRequest() {
    this.sendRequestBtnClick.emit(this.training);
  }

  isAdmin(): boolean {
    return false;
  }

}
