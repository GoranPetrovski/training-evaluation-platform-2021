import { Training } from "./training";
import { User } from "./user";

export class TrainingRating {
    id: number;
    trainingId: Training;
    userId: User;
    rating: number; //should be between 0-5
    hasCup: boolean; //if has 4 or more than 4 stars, user hasCup is equal to true
}
