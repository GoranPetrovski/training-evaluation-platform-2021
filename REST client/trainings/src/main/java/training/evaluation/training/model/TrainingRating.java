package training.evaluation.training.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "trainingRating")
public class TrainingRating {

    @Id
    @Getter
    private String id;
    @Getter
    @Setter
    private String trainingId;
    @Getter
    @Setter
    private String userId;
    @Getter
    @Setter
    private int rating;  //should be between 0-5
    @Getter
    @Setter
    private boolean cup;
    @Getter
    @Setter
    private boolean done;

    public TrainingRating() {
    }

    public TrainingRating(String trainingId, String userId, int rating, boolean cup) {
        this.trainingId = trainingId;
        this.userId = userId;
        this.rating = rating;
        this.cup = cup;
    }

    @Override
    public String toString() {
        return "TrainingRating{" +
                "id='" + id + '\'' +
                ", trainingId='" + trainingId + '\'' +
                ", userId='" + userId + '\'' +
                ", rating=" + rating +
                ", cup=" + cup +
                ", done=" + done +
                '}';
    }


    public static class TrainingRatingResponse {
        @Id
        @Getter
        private String id;
        @Getter
        @Setter
        private Training trainingId;
        @Getter
        @Setter
        private User userId;
        @Getter
        @Setter
        private int rating;  //should be between 0-5
        @Getter
        @Setter
        private boolean cup;
        @Getter
        @Setter
        private boolean done;

        public TrainingRatingResponse() {
        }

        public TrainingRatingResponse(String id, Training trainingId, User userId, int rating, boolean cup, boolean done) {
            this.id = id;
            this.trainingId = trainingId;
            this.userId = userId;
            this.rating = rating;
            this.cup = cup;
            this.done = done;
        }
    }


}
