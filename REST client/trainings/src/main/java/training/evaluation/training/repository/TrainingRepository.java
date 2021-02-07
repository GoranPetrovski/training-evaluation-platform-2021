package training.evaluation.training.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import training.evaluation.training.model.Training;
import java.util.List;


public interface TrainingRepository  extends  MongoRepository<Training, String> {
    List<Training> findByName(String name);
    List<Training> findByLevel(String level);
    List<Training> findByNameStartingWith(String starting);
    List<Training> findByNameStartingWithAndLevel(String name, String level);

}
