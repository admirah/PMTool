package users.controllers;

import users.database.AuthToken;
import users.database.User;
import users.models.AuthTokenModel;
import users.models.Factory;
import users.models.ResponseModel;
import users.models.UserModel;
import users.models.UserRegisterModel;
import users.models.UsersIds;
import users.services.AuthTokenService;
import users.services.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by abasic on 20.03.2017..
 */
@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UserService service;
    @Autowired
    private AuthTokenService authTokenService;
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

    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET, produces = "application/json")
    public @ResponseBody ResponseEntity<List<UserModel>> GetByName(@PathVariable String name) {
        try {
            List<UserModel> filteredUsers = new ArrayList<>();
            List<UserModel> usersModel = new ArrayList<>();
            service.Get().forEach(user -> {
                usersModel.add(factory.Create(user));
            });
            for (UserModel user: usersModel) {
                if (user.getName().contains(name))
                {
                    filteredUsers.add(user);
                }
            }

            return new ResponseEntity<List<UserModel>>(filteredUsers, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return new ResponseEntity(new ResponseModel("Error while fetching data"), HttpStatus.BAD_REQUEST);
    }
    @RequestMapping(value = "/all", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody ResponseEntity<List<UserModel>> GetByIds(@RequestBody UsersIds model) {
        try {
        	List<UserModel> usersModel = new ArrayList<>();
            service.Get().stream().filter(x -> model.getIds().contains(x.getId()))
            					  .map(x -> factory.Create(x))
            					  .forEach(x -> usersModel.add(x));
            return new ResponseEntity<List<UserModel>>(usersModel, HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return new ResponseEntity(new ResponseModel("Error while fetching data"), HttpStatus.BAD_REQUEST);
    }
    
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody ResponseEntity<ResponseModel> Register(@RequestBody UserRegisterModel model) {
        try {
        	User user = factory.Create(model);
        	service.Insert(user);
        	return new ResponseEntity<ResponseModel>(new ResponseModel("User added"), HttpStatus.OK);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return new ResponseEntity<ResponseModel>(new ResponseModel("Error while fetching data"), HttpStatus.BAD_REQUEST);
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
    
    @RequestMapping(value="/authenticate", method = RequestMethod.POST, produces = "application/json")
    public AuthTokenModel authenticate(@RequestParam Map<String,String> credentials) {
    
    	AuthTokenModel auth = new AuthTokenModel();
    	
    	try {
    		
	    	logger.info("Authentication...");
	    	
	    	
	    	String username = credentials.get("username");
	    	String password = credentials.get("password");
	    	
	    	logger.info("USER: " + credentials.get("username"));
	    	
	    	User user = service.Get(username);
	    	
			if(user != null) {
				
				logger.info("USER EXISTS");
				
				/* No hashing password */
				if(user.getPassword().equals(password)) {
					
					/* Delete all previous tokens */
					
					authTokenService.DeleteTokensForUser(user.getId());
					
					String tmpToken = username + new Date().getTime(); 
					Date tmpExpiration = new Date();
					
					auth.setAuthenticated(true);
					auth.setUsername(username);
					auth.setToken(tmpToken);
					auth.setUserId(user.getId());
					auth.setExpiration(tmpExpiration);
					
					AuthToken token = new AuthToken();
					
					token.setToken(tmpToken);
					token.setExpiration(tmpExpiration);
					token.setUser(user);
					
					authTokenService.Insert(token);
					
					return auth;
				}
			}
    	} catch (Exception e) {
			logger.error(e.getMessage());
		}
		
		auth.setAuthenticated(false);
		return auth;
    }
    
    @RequestMapping(value = "/authorize", method = RequestMethod.POST, produces = "application/json")
	public AuthTokenModel authorize(@RequestParam Map<String,String> tkn) {
    	
    	String token = tkn.get("token");
    	
    	if(token == null) return null;
    	
    	AuthTokenModel result = new AuthTokenModel();
    	
    	AuthToken authToken = authTokenService.GetByToken(token);
    	
    	if(authToken == null) return null;
    	
	    result.setAuthenticated(true);
		result.setExpiration(authToken.getExpiration());
		result.setToken(authToken.getToken());
		result.setUsername(authToken.getUser().getUsername());
		
		return result;
	}
}
