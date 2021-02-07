package training.evaluation.training.model;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "trainings")
public class Training {
    @Id
    @Getter private String id;
    @Indexed(unique=true)
    @Getter @Setter private String name;
    @Getter @Setter private String level;
    @Getter @Setter private String description;
    @Getter @Setter private Binary picture;
    @Getter @Setter private String trainer;
    @Getter @Setter private List<String> skills;

    public Training() {}

    public Training(String name, String level, String description, Binary picture, String trainer, List<String> skills) {
        this.name = name;
        this.level = level;
        this.description = description;
        this.picture = picture;
        this.trainer = trainer;
        this.skills = skills;
    }

    public Training(String name, String level) {
        this.name = name;
        this.level = level;
    }

    @Override
    public String toString() {
        return "Name: " + name + ", Level: " + level + ", Description: " + description;
    }
}
