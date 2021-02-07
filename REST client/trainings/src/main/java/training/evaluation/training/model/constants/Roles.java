package training.evaluation.training.model.constants;

public class Roles {
    public static final String ADMIN = "ROLE_ADMIN";        //read/update/delete users/trainings
    public static final String USER = "ROLE_USER";          //read trainings from its level,update self profile
    public static final String TRAINER = "ROLE_TRAINER";    //read users/trainings, create new, update/delete training created by him, update self profile, grade users who listened training
}
