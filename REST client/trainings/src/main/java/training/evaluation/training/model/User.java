package training.evaluation.training.model;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

import static training.evaluation.training.model.constants.Levels.JSE;
import static training.evaluation.training.model.constants.Roles.USER;

@Document(collection = "users")
public class User {

    @Id
    @Getter private String id;
    @Indexed(unique=true)
    @Getter @Setter private String username;
    @Getter @Setter private String password;
    @Getter @Setter private String firstname;
    @Getter @Setter private String lastname;
    @Getter @Setter private String role=USER;                            // USER, TRAINER, ADMIN
    @Getter @Setter private String level=JSE;                           // JSE, SE, SSE, TL


    @Getter @Setter private List<String> skills;
    @Getter @Setter private List<String> trainingRatings;
    @Getter @Setter private Binary picture;


    public User() {}

    public User(String username, String password, String firstname, String lastname) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", role='" + role + '\'' +
                ", level='" + level + '\'' +
                ", skills=" + skills +
                ", trainingRatings=" + trainingRatings +
                ", picture=" + picture +
                '}';
    }
}
