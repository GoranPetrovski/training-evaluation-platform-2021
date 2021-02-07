import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TrainingRatingService {
    private trainingRequestUrl = 'http://localhost:8080/trainingRating';

    constructor(private http: HttpClient) { }

    getAllTrainingRatings(): Observable<Object> {
        return this.http.get(`${this.trainingRequestUrl}/all`);
    }

    getTrainingRatingsByUserId(userId){
        return this.http.get(`${this.trainingRequestUrl}/getAllByUserId/${userId}`);
    }

    rateTraining(id: number, rating: number) {
        return this.http.post(`${this.trainingRequestUrl}/rateTraining/${id}/${rating}`, {});
    }

    doneRating(id){
        return this.http.post(`${this.trainingRequestUrl}/rate/${id}`, {});
    }
}
