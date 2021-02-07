import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TrainingRequest } from '../models/training-request';
import { trainingRequests } from '../../api/training-requests/training-requests';
import { allTrainingRequests } from '../../api/training-requests/all-training-request';
import { Observable } from '../../../node_modules/rxjs';


@Injectable()
export class TrainingRequestService {
    private trainingRequestUrl = 'http://localhost:8080/trainingRequest';

    constructor(private http: HttpClient) { }

    getTrainingRequestsByUser(): TrainingRequest[] {
        return trainingRequests;
    }

    getAllTrainingRequest(): Observable<Object> {
        return this.http.get(`${this.trainingRequestUrl}/all`);
    }

    createNewTrainingRequest(trainingRequest): Observable<Object> {
        return this.http.post(`${this.trainingRequestUrl}/new`, trainingRequest);
    }

    approveTrainingRequest(trainingRequestId) {
        return this.http.post(`${this.trainingRequestUrl}/approve/${trainingRequestId}`, {});
    }

    cancelTrainingRequest(trainingRequestId) {
        return this.http.post(`${this.trainingRequestUrl}/cancel/${trainingRequestId}`, {});
    }

    getTrainingRequestById(id) {
        return this.http.get(`${this.trainingRequestUrl}/getByTrainingRequestId/${id}`);
    }

    getAllApprovedTrainingRequest() {
        return this.http.get(`${this.trainingRequestUrl}/allApproved`);
    }

    completeTrainingRequest(id) {
        return this.http.post(`${this.trainingRequestUrl}/complete/${id}`, {});
    }

    getByUserId(userId) {
        return this.http.get(`${this.trainingRequestUrl}/getByUserId/${userId}`);
    }
}
