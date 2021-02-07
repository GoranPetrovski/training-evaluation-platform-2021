package training.evaluation.training.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import training.evaluation.training.model.TrainingRating;

import java.util.List;

public interface TrainingRatingRepository extends MongoRepository<TrainingRating, String> {
    List<TrainingRating> findByUserId(String userId);
    List<TrainingRating> findByDone(boolean isDone);
}
