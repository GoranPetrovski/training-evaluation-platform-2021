package training.evaluation.training.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import training.evaluation.training.model.TrainingRequest;

import java.util.List;
import java.util.Optional;


public interface TrainingRequestRepository extends MongoRepository<TrainingRequest, String> {
    Optional<TrainingRequest> findById(String id);
    List<TrainingRequest> findByStatus(String status);
    List<TrainingRequest> findByUserId(String userId);
}
