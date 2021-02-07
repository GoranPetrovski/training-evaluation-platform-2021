package training.evaluation.training.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;
import training.evaluation.training.model.User;
import training.evaluation.training.repository.UserRepository;
import training.evaluation.training.service.IUserServices;

import static training.evaluation.training.model.constants.Roles.*;

import java.util.List;
import java.util.Optional;


@org.springframework.stereotype.Service
public class UserServicesImpl implements IUserServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    CommonServices commonServices;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public ResponseEntity<User> register(User user) {
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    public ResponseEntity<User> update(String id, User user) {
        String role = commonServices.getRoleFromLoggedUser(CommonServices.token);
        String username = commonServices.getUsernameFromLoggedUser(CommonServices.token);
        Optional<User> userData = userRepository.findById(id);

        if (role.equals(ADMIN) || ((role.equals(TRAINER) || role.equals(USER)) && userData.get().getUsername().equals(username))) {

            if (userData.isPresent()) {
                User usr = userData.get();
                usr.setUsername(user.getUsername());
                usr.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                usr.setFirstname(user.getFirstname());
                usr.setLastname(user.getLastname());
                usr.setRole(user.getRole());
                usr.setLevel(user.getLevel());
                return new ResponseEntity<>(userRepository.save(usr), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<String> delete(String id) {
        String role = commonServices.getRoleFromLoggedUser(CommonServices.token);
        if (role.equals(ADMIN)) {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                userRepository.delete(user.get());
                return new ResponseEntity<>("User deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<List<User>> getAllUsers() {
        String role = commonServices.getRoleFromLoggedUser(CommonServices.token);
        if (role.equals(ADMIN) || role.equals(TRAINER)) {
            return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<User> getByUsername(String username) {
        return new ResponseEntity<>(userRepository.findByUsername(username), HttpStatus.OK);
    }

    public ResponseEntity<User> setProfilePicture(MultipartFile multipart, String username) {
        String role = commonServices.getRoleFromLoggedUser(CommonServices.token);
        String loggedUsername = commonServices.getUsernameFromLoggedUser(CommonServices.token);

        if (role.equals(ADMIN) || ((role.equals(TRAINER) || role.equals(USER)) && username.equals(loggedUsername))) {
            return new ResponseEntity<>(commonServices.uploadUserPicture(multipart, username), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    public ResponseEntity<String> getProfilePicture(String username) {
        return new ResponseEntity<>(commonServices.retrieveUserPicture(username), HttpStatus.OK);
    }

    public ResponseEntity<User> setRoleToUser(String id, String role) {
        String roleLoggedUser = commonServices.getRoleFromLoggedUser(CommonServices.token);
        String username = commonServices.getUsernameFromLoggedUser(CommonServices.token);
        Optional<User> userData = userRepository.findById(id);
        if (roleLoggedUser.equals(ADMIN) || roleLoggedUser.equals(TRAINER) || role.equals(USER) && userData.get().getUsername().equals(username)) {
            if (role.equals(ADMIN) || role.equals(TRAINER) || role.equals(USER)) {
                if (userData.isPresent()) {
                    User usr = userData.get();
                    usr.setRole(role);
                    return new ResponseEntity<>(userRepository.save(usr), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
