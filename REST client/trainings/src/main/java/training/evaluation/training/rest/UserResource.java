package training.evaluation.training.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import training.evaluation.training.model.User;
import training.evaluation.training.security.JwtTokenUtil;
import training.evaluation.training.service.IUserServices;
import training.evaluation.training.service.impl.CommonServices;

import java.util.List;

@CrossOrigin(origins = {"${origins}"})
@RestController
@RequestMapping(value = "/user")
@Api(description = "Resource to expose all available user endpoints", tags = {"UserResource"})
public class UserResource {

    @Autowired
    private IUserServices userServices;

    @Autowired
    CommonServices commonServices;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @PostMapping("/sign-up")
    @ApiOperation(value = "New user registration", notes = "The user must contain username, password, firstname and lastname fields. ")
    public ResponseEntity<User> signUp(@ApiParam(value = "User in JSON format. Username, password, firstname and lastname  are required fields, ID is autogenerated.", required = true) @RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userServices.register(user);
    }

    @PostMapping("/update/{id}")
    @ApiOperation(value = "Update user record", notes = "Update user by ID, as a path variable. Request body is user in JSON format with new values - username and password are required")
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "ID of the record that we need to update.", required = true) @PathVariable String id, @ApiParam(value = "User object in JSON format with username and password as a required fields", required = true) @RequestBody User user) {
        CommonServices.token = authorisation;
        return userServices.update(id, user);
    }

    @DeleteMapping("/delete/{id}")
    @ApiOperation(value = "Delete user record", notes = "Delete user by ID, as a path variable.")
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "ID of the record that we need to delete.", required = true) @PathVariable String id) {
        CommonServices.token = authorisation;
        return userServices.delete(id);
    }

    @GetMapping("/all")
    @ApiOperation(value = "Get all registered users", notes = "Return list of registered users. User must be previously logged in (Baerer Authorization with JWT token needed). ")
    public ResponseEntity<List<User>> getAll(@RequestHeader("Authorization") String authorisation) {
        CommonServices.token = authorisation;
        return userServices.getAllUsers();
    }

    @GetMapping("/byUsername/{username}")
    @ApiOperation(value = "Find user by username", notes = "Find user by username. Return registered user with searched name. User must be previously logged in (Baerer Authorization with JWT token needed).")
    public ResponseEntity<User> getByUsername(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "Username of the user that we search for as a path variable.", required = true) @PathVariable String username) {
        CommonServices.token = authorisation;
        return userServices.getByUsername(username);
    }

    @PostMapping("/uploadPicture/{username}")
    @ApiOperation(value = "Upload profile picture to user by username", notes = "Find user by username and upload profile picture")
    public ResponseEntity<User> singleFileUpload(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "File to upload", required = true) @RequestParam("file") MultipartFile multipart, @ApiParam(value = "Username of the user that we need to upload profile picture", required = true) @PathVariable("username") String username) {
        CommonServices.token = authorisation;
        return userServices.setProfilePicture(multipart, username);
    }

    @GetMapping("/retrievePicture/{username}")
    @ApiOperation(value = "Retrieve picture to training by name. Return location of the downloaded file", notes = "Find training by name and retrieve picture")
    public ResponseEntity<String> retrieveFile(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "Name of the user that we need to retrieve picture", required = true) @PathVariable("username") String username) {
        CommonServices.token = authorisation;
        return userServices.getProfilePicture(username);
    }

    @PutMapping("/setRoleToUser/{id}/{role}")
    @ApiOperation(value = "Set ROLE to user", notes = "Set ROLE value to a particular user")
    public ResponseEntity<User> setRoleToUser(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "Id of the user that we need to set role.", required = true) @PathVariable String id, @ApiParam(value = "Role value that we need to set", required = true) @PathVariable String role) {
        CommonServices.token = authorisation;
        return userServices.setRoleToUser(id, role);
    }
}
