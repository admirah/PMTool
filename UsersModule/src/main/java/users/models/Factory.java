package users.models;

import users.database.AuthToken;
import users.database.User;

import org.apache.http.auth.AUTH;
import org.springframework.stereotype.Component;

/**
 * Created by abasic on 20.03.2017..
 */
@Component
public class Factory {

    public UserModel Create(User user){
        return new UserModel(){
            {
                setId(user.getId());
                setEmail(user.getEmail());
                setName(user.getName());
                setBio(user.getBio());
                setImage(user.getImage());
            }
        };
    }
    public User Create(UserModel model) {
        return new User(model.getEmail(), model.getName(), model.getBio(), model.getImage());
    }
    
    public User Create(UserRegisterModel model) {
    	User user = new User();
    	user.setName(model.getName());
    	user.setUsername(model.getUsername());
    	user.setPassword(model.getPassword());
    	user.setBio(model.getBio());
    	user.setEmail(model.getEmail());
    	user.setImage(model.getImage());
    	return user;
    }

    public AuthTokenModel Create(AuthToken auth) {
    	return new AuthTokenModel() {
    		{
    			setToken(auth.getToken());
    			setExpiration(auth.getExpiration());
    			setUsername(auth.getUser().getUsername());
    		}
    	};
    }
}
