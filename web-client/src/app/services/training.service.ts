import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Training } from '../models/training';

@Injectable()
export class TrainingService {

  private trainingUrl = 'http://localhost:8080/training';

  constructor(private http: HttpClient) { }

  getAllTrainings(): Observable<any> {
    return this.http.get(`${this.trainingUrl}/all`);
  }

  getTraining(id: number): Observable<Object> {
    return this.http.get(`${this.trainingUrl}/training/${id}`)
  }

  createNewTraining(newTraining: Training): Observable<Object> {
    return this.http.post(`${this.trainingUrl}/new`, newTraining);
  }

  updateTraining(id: number, updateTraining: Training): Observable<Object> {
    return this.http.post(`${this.trainingUrl}/update/${id}`, updateTraining);
  }

  deleteTraining(id: number): Observable<any> {
    return this.http.delete(`${this.trainingUrl}/delete/${id}`, { responseType: 'text' })
  }

  filterByName(name: string): Observable<Object> {
    return this.http.get(`${this.trainingUrl}/filterByName/${name}`)
  }

  filterByLevel(level: string): Observable<Object> {
    return this.http.get(`${this.trainingUrl}/filterByLevel/${level}`)
  }

  filterByNameAndLevel(name: string, level:string){
    return this.http.get(`${this.trainingUrl}/filterByNameAndLevel/${name}/${level}`);
  }
}
