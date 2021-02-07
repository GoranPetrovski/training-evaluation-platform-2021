package training.evaluation.training.service.impl;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import training.evaluation.training.model.Training;
import training.evaluation.training.model.TrainingRating;
import training.evaluation.training.model.TrainingRequest;
import training.evaluation.training.model.User;
import training.evaluation.training.repository.TrainingRepository;
import training.evaluation.training.repository.TrainingRequestRepository;
import training.evaluation.training.repository.UserRepository;
import training.evaluation.training.security.JwtTokenUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class CommonServices {

    public static String token;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private TrainingRequestRepository trainingRequestRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    public User uploadUserPicture(MultipartFile multipart, String identificator) {
        User userRecord = userRepository.findByUsername(identificator);
        userRecord.setPicture(multipartToBinary(multipart));
        userRepository.save(userRecord);
        return userRecord;
    }

    public Training uploadTrainingPicture(MultipartFile multipart, String identificator) {
        Training trainingRecord = trainingRepository.findByName(identificator).get(0);
        trainingRecord.setPicture(multipartToBinary(multipart));
        trainingRepository.save(trainingRecord);
        return trainingRecord;
    }

    public Binary multipartToBinary(MultipartFile multipart) {
        try {
            Binary binaryPic = new Binary(BsonBinarySubType.BINARY, multipart.getBytes());
            return binaryPic;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String retrieveUserPicture(String username) {
        User user = userRepository.findByUsername(username);
        Binary document = user.getPicture();
        return commonRetrieve("user", document, username);
    }


    public String retrieveTrainingPicture(String trainingName) {
        Training training = trainingRepository.findByName(trainingName).get(0);
        Binary document = training.getPicture();
        return commonRetrieve("training", document, trainingName);
    }

    public String commonRetrieve(String type, Binary document, String name) {
        String path = "C://Users//" + System.getProperty("user.name") + "//Downloads" + "//temp";
        File folder = new File(path);
        if (document != null) {
            FileOutputStream fileOuputStream = null;
            try {
                createIfNotExist(folder);
                if (type.equals("user")) {
                    folder = new File(path + "//user");
                    if (!createIfNotExist(folder)) {
                        if (folder.isDirectory()) {
                            for (File f : folder.listFiles()) {
                                f.delete();
                            }
                        }
                    }
                } else if (type.equals("training")) {
                    folder = new File(path + "//training");
                    createIfNotExist(folder);
                }
                fileOuputStream = new FileOutputStream(folder.getPath() + "//" + name + "_picture.jpg");
                fileOuputStream.write(document.getData());
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (fileOuputStream != null) {
                    try {
                        fileOuputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }

        return path;
    }

    public boolean createIfNotExist(File folder) {
        if (!folder.exists()) {
            folder.mkdir();
            return true;
        }
        return false;
    }

    public User getUserFromToken(String authorizationValue) {
        User user = null;
        if (authorizationValue != null || authorizationValue.startsWith("Bearer ")) {

            String token = authorizationValue.substring(14);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            user = userRepository.findByUsername(username);
        }
        return user;
    }

    public String getUsernameFromLoggedUser(String authorization) {
        String token = authorization.substring(14);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return username;
    }

    public String getRoleFromLoggedUser(String authorization) {
        String token = authorization.substring(14);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        return user.getRole();
    }

    public String getLevelFromLoggedUser(String authorization) {
        String token = authorization.substring(14);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        return user.getLevel();
    }

    public List<TrainingRequest.TrainingRequestResponse> getTrainingRequestResponse(List<TrainingRequest> trainingRequests) {
        List<TrainingRequest.TrainingRequestResponse> trainingRequestResponses = new ArrayList<>();
        for (TrainingRequest trainingRequest : trainingRequests) {
            TrainingRequest.TrainingRequestResponse response = getResponseFromTrainingRequest(trainingRequest);
            trainingRequestResponses.add(response);
        }

        return trainingRequestResponses;
    }

    public TrainingRequest.TrainingRequestResponse getResponseFromTrainingRequest(TrainingRequest trainingRequest) {
        Training training = trainingRepository.findById(trainingRequest.getTrainingId()).get();
        User user = userRepository.findById(trainingRequest.getUserId()).get();
        TrainingRequest.TrainingRequestResponse response = new TrainingRequest.TrainingRequestResponse(trainingRequest.getId(), training, user, trainingRequest.isCompleted(), trainingRequest.getStatus());
        return response;
    }

    public List<TrainingRating.TrainingRatingResponse> getTrainingRatingResponse(List<TrainingRating> trainingRatings) {
        List<TrainingRating.TrainingRatingResponse> trainingRatingResponses = new ArrayList<>();
        for (TrainingRating trainingRating : trainingRatings) {
            TrainingRating.TrainingRatingResponse response = getResponseFromTrainingRating(trainingRating);
            trainingRatingResponses.add(response);
        }

        return trainingRatingResponses;
    }

    public TrainingRating.TrainingRatingResponse getResponseFromTrainingRating(TrainingRating trainingRating) {
        Training training = trainingRepository.findById(trainingRating.getTrainingId()).get();
        User user = userRepository.findById(trainingRating.getUserId()).get();

        //String id, Training trainingId, User userId, int rating, boolean cup, boolean done
        TrainingRating.TrainingRatingResponse response = new TrainingRating.TrainingRatingResponse(trainingRating.getId(), training, user, trainingRating.getRating(), trainingRating.isCup(), trainingRating.isDone());
        return response;
    }
}
