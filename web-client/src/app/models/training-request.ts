import { Training } from "./training";
import { User } from "./user";

export class TrainingRequest {
    id: number;
    training: Training;
    user: User;
    isCompleted: boolean;
    status: string; //APPROVED, PENDING, CANCELED,
}