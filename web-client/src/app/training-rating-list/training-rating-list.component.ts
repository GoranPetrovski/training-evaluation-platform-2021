import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '../../../node_modules/@angular/material';
import { TrainingRating } from '../models/training-rate';
import { TrainingRatingService } from '../services/training-rating.service';
import { RatingChangeEvent } from 'angular-star-rating';
import { ToastNotificationService } from '../services/toast-notification.service';

@Component({
  selector: 'app-training-rating-list',
  templateUrl: './training-rating-list.component.html',
  styleUrls: ['./training-rating-list.component.css']
})
export class TrainingRatingListComponent implements OnInit {

  dataSource: MatTableDataSource<TrainingRating>;
  numStars: number;
  onRatingChangeResult: RatingChangeEvent;
  rateIcon: string;
  rateTitle: string;

  constructor(public dialog: MatDialog,
    private trainingRatingService: TrainingRatingService,
    private toastNotificationService: ToastNotificationService) { }

  displayedColumns = ['id', 'user', 'training', 'rate', 'actions'];

  ngOnInit() {
    this.reloadTrainingRating();
    this.numStars = 0;
    this.rateIcon = "star";
    this.rateTitle = "Rate completed training records!"
  }

  rateRequest(trainingRating: TrainingRating) {
    this.trainingRatingService.rateTraining(trainingRating.id, this.numStars).subscribe((rate: TrainingRating) => {
      const messageInfo = `Training ${trainingRating.trainingId.name} is rated with ${this.numStars} stars!`;
      let message = this.numStars == 0 ? 'You must select some star' : this.numStars >= 4 ? `${messageInfo} Congratulation you achieve cup!` : `${messageInfo}You must learn more to achieve cup`;
      this.toastNotificationService.showNotification(message);
    });
  }

  doneRating(trainingRating: TrainingRating){
    this.trainingRatingService.doneRating(trainingRating.id).subscribe(()=> {
      this.toastNotificationService.showNotification("Your rating is completed!");
      this.reloadTrainingRating();
    });
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    this.numStars = $event.rating;
    this.onRatingChangeResult = $event;
  };

  reloadTrainingRating() {
    this.trainingRatingService.getAllTrainingRatings().subscribe((trainingRatings: TrainingRating[]) => {
      this.dataSource = new MatTableDataSource(trainingRatings);
    });
  }
}
