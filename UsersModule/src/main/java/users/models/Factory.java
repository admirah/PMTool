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
