package training.evaluation.training.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import training.evaluation.training.model.User;

import java.util.List;

public interface IUserServices {

    ResponseEntity<User> register(User user);

    ResponseEntity<User> update(String id, User user);

    ResponseEntity<String> delete(String id);

    ResponseEntity<List<User>> getAllUsers();

    ResponseEntity<User> getByUsername(String username);

    ResponseEntity<User> setProfilePicture(MultipartFile multipart, String username);

    ResponseEntity<String> getProfilePicture(String username);

    ResponseEntity<User> setRoleToUser(String id, String role);

}