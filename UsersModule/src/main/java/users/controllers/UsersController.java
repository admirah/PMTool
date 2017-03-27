package users.controllers;

import users.database.User;
import users.models.Factory;
import users.models.ResponseModel;
import users.models.UserModel;
import users.services.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by abasic on 20.03.2017..
 */
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService service;
    @Autowired
    private Factory factory;

    static final Logger logger = LogManager.getLogger(UsersController.class.getName());

    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<UserModel>> Get() {
        try {
            List<UserModel> usersModel = new ArrayList<>();
            service.Get().forEach(user -> {
                usersModel.add(factory.Create(user));
            });
            return new ResponseEntity<List<UserModel>>(usersModel, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return new ResponseEntity(new ResponseModel("User not found"), HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<UserModel> Get(@PathVariable("id") Long id) {
        try {
            UserModel model = factory.Create(service.Get(id));
            if(model != null) return new ResponseEntity<UserModel>(model, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return new ResponseEntity(new ResponseModel("User not found"), HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<UserModel> Insert(@RequestBody UserModel model) {
        if(model == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        User user = factory.Create(model);
        try {
            service.Insert(user);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<UserModel>(factory.Create(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = "application/json")
    public ResponseEntity<UserModel> Update(@PathVariable("id") Long id, @RequestBody UserModel model) {
        if(model == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        User user = factory.Create(model);
        try {
            service.Update(user, id);
        } catch (Exception e) {
            logger.error(e.getMessage());
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<UserModel>(factory.Create(service.Get(id)), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<UserModel> Delete(@PathVariable("id") Long id) {
        try {
            service.Delete(id);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return new ResponseEntity(new ResponseModel("User not found"), HttpStatus.NOT_FOUND);
    }
}
