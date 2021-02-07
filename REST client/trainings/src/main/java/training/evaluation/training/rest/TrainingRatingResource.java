package training.evaluation.training.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import training.evaluation.training.model.TrainingRating;
import training.evaluation.training.service.ITrainingServices;
import training.evaluation.training.service.impl.CommonServices;

@CrossOrigin(origins = {"${origins}"})
@RestController
@RequestMapping(value = "/trainingRating")
@Api(description = "Resource to expose all available training rating endpoints", tags = {"TrainingRating"})
public class TrainingRatingResource {

    @Autowired
    ITrainingServices services;

    @Autowired
    CommonServices commonServices;

    @GetMapping("/all")
    @ApiOperation(value = "Get all training ratngs ", notes = "Return list of training ratings")
    public ResponseEntity<Iterable<TrainingRating.TrainingRatingResponse>> getAllTrainingRatings() {
        return services.getAllTrainingRatings();
    }

    @GetMapping("/getAllByUserId/{userId}")
    @ApiOperation(value = "Find training ratings by userId", notes = "Find training ratings by user id. Return list of training ratings of the searched userId. User must be previously logged in (Baerer Authorization with JWT token needed).")
        public ResponseEntity<Iterable<TrainingRating.TrainingRatingResponse>> getAllTrainingRatingsByUserId(@ApiParam(value = "User id of the user that we search for as a path variable.", required = true) @PathVariable String userId) {
         return services.getAllTrainingRatingsByUserId(userId);
    }

    @PostMapping("/rateTraining/{id}/{rating}")
    @ApiOperation(value = "Rate training", notes = "Find training ratings by id and set rate value. User must be previously logged in (Baerer Authorization with JWT token needed).")
    public ResponseEntity<TrainingRating> rateTraining(@RequestHeader("Authorization") String authorisation, @ApiParam(value = "Training Ratings id of the object that we need to update rating", required = true) @PathVariable String id,@ApiParam(value = "Rating value that we need to set", required = true) @PathVariable int rating) {
        CommonServices.token=authorisation;

        String role = commonServices.getRoleFromLoggedUser(authorisation);
        System.out.println("ROLE: " + role);
        return services.rateTraining(id,rating);
    }

    @PostMapping("/rate/{id}")
    @ApiOperation(value = "Rate training", notes = "Save raiting. Add skills from training to user prifile")
    public ResponseEntity<String> rate(@ApiParam(value="training rating id, whisch rateing should be saved.", required = true) @PathVariable String id){
        return services.rate(id);
    }
}
