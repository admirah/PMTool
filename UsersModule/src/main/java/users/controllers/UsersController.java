package users.controllers;

import org.apache.commons.lang.StringUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
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

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import java.io.IOException;
import java.util.stream.Collectors;

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
            if(!StringUtils.isEmpty(model.getImage())){
            File file = new File(UPLOADED_FOLDER + model.getImage());
            FileInputStream fis=new FileInputStream(file);
            ByteArrayOutputStream bos=new ByteArrayOutputStream();
            int b;
            byte[] buffer = new byte[1024];
            while((b=fis.read(buffer))!=-1){
                bos.write(buffer,0,b);
            }
            byte[] fileBytes=bos.toByteArray();
            fis.close();
            bos.close();
            byte[] encoded= Base64.encodeBase64(fileBytes);
            String encodedString = new String(encoded);
            model.setImage(encodedString);}
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

    private static String UPLOADED_FOLDER = "C://Users//Vejsil//Documents//PMTool//PMTool-Angular//src//";
    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json")
    public Resp singleFileUpload(@RequestParam(value = "userId") Long userId, @RequestParam("image") MultipartFile image) {

        try {
            System.out.print(userId);
            // Get the file and save it somewhere
            byte[] bytes = image.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + image.getOriginalFilename());
            System.out.print(image.getOriginalFilename());
            Files.write(path, bytes);
            User user = service.Get(userId);
            user.setImage(image.getOriginalFilename());
            service.Update(user, userId);
            return new Resp("OK");

        } catch (IOException e) {
            e.printStackTrace();
            return new Resp("NOK");
        }

    }

    public class Resp {
        public Resp(String attr) {
            this.attr = attr;
        }

        public String getAttr() {
            return attr;
        }

        public void setAttr(String attr) {
            this.attr = attr;
        }

        private String attr;

    }
}
