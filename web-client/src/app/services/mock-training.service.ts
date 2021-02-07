import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { trainings } from '../../api/trainings/trainings';
import { levelsApi } from '../../api/levels/levels';
import { Training } from '../models/training';

@Injectable()
export class TrainingService {

    private trainings: Array<Training> = trainings;

    constructor(private http: HttpClient) { }

    getAllTrainings(): Observable<any> {
        return of(this.trainings);
    }

    getTraining(id: number): Observable<Object> {
        const training = this.trainings.find(t => t.id === id);
        return of(training);
    }

    createNewTraining(newTraining: Training): Observable<Training> {
        let newId = 0;
        this.trainings.forEach(t => {
            if (t.id >= newId) newId = t.id + 1;
        });
        newTraining.id = newId;
        this.trainings.push(newTraining);
        return of(newTraining);
    }

    updateTraining(updateTraining: Training) {
        const training = this.trainings.find(t => t.id === updateTraining.id);
        //update level valueView by value property
        // let level = levelsApi.find(x => x == training.level);
        // updateTraining.level = level;
        Object.assign(training, updateTraining);
        return of(updateTraining).pipe(delay(2000));
    }

    deleteTraining(id: number) {
        return this.trainings.splice(this.trainings.findIndex(t => t.id == id), 1);
    }

    filterByName(name: string) {
        return this.getAllTrainings().subscribe(allTrainings => {
            return <Training[]>allTrainings.filter((t: Training) =>
                t.name.toLocaleLowerCase().indexOf(name) != -1
            );
        })
    }
}
