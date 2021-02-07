package training.evaluation.training.service;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;
import training.evaluation.training.model.Training;
import training.evaluation.training.model.TrainingRating;
import training.evaluation.training.model.TrainingRequest;

import java.util.List;

public interface ITrainingServices {

    ResponseEntity<Training> createTraining(Training training);

    ResponseEntity<List<Training>> getAllTrainings();

    ResponseEntity<String> deleteTraining(String id);

    ResponseEntity<Training> updateTraining(String id, Training training);

    ResponseEntity<List<Training>> findByNameStartingWith(String name);

    ResponseEntity<List<Training>> filterByLevel(String level);

    ResponseEntity<List<Training>> findByNameStartingWithAndLevel(String name, String level);

    ResponseEntity<Training> setTrainingPicture(MultipartFile multipart, String trainingName);

    ResponseEntity<String> getTrainingPicture(String trainingName);

    ResponseEntity<List<Training>> getAllTrainingsByUserLevel();

    ResponseEntity<TrainingRequest> createTrainingRequest(TrainingRequest trainingRequest);

    ResponseEntity<TrainingRequest> approveTrainingRequest(String id);

    ResponseEntity<TrainingRequest> cancelTrainingRequest(String id);

    ResponseEntity<TrainingRequest> completeTrainingRequest(String id);

    ResponseEntity<List<TrainingRequest.TrainingRequestResponse>> getAllTrainingRequests();

    ResponseEntity<List<TrainingRequest.TrainingRequestResponse>> getAllApprovedTrainingRequests();

    ResponseEntity<TrainingRequest.TrainingRequestResponse> getByTrainingRequestId(String id);

    ResponseEntity<Iterable<TrainingRequest.TrainingRequestResponse>> getTrainingRequestsByUserId(String userId);

    //training rating
    ResponseEntity<Iterable<TrainingRating.TrainingRatingResponse>> getAllTrainingRatings();

    ResponseEntity<Iterable<TrainingRating.TrainingRatingResponse>> getAllTrainingRatingsByUserId(String userId);

    ResponseEntity<TrainingRating> rateTraining(String id, int rating);

    ResponseEntity<String> rate(String trainingRatingId);
}
