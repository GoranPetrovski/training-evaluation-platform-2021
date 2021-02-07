import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Training } from "../models/training";
import { TrainingService } from "./training.service";

const ALL_LEVELS: string = 'All levels';

@Injectable()
export class FilterTrainingService {

    constructor(private trainingService: TrainingService) { }

    filterTrainings(nameFilter: string, levelFilter: string) {
        return levelFilter == ALL_LEVELS ?
            this.filterByName(nameFilter) :
            levelFilter && nameFilter ?
                this.trainingService.filterByNameAndLevel(nameFilter, levelFilter) :
                this.filterByLevel(levelFilter);
    }

    private filterByLevel(filterValue: string): Observable<Training[]> {
        return (!filterValue) ? this.trainingService.getAllTrainings() : this.trainingService.filterByLevel(filterValue);
    }

    private filterByName(filterValue: string) {
        return (!filterValue) ? this.trainingService.getAllTrainings() : this.trainingService.filterByName(filterValue);
    }

}
