package users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import users.database.AuthToken;
import users.repository.IAuthTokenRepository;

@Component
public class AuthTokenService {

	@Autowired
    private IAuthTokenRepository repository;
	
	@Transactional
	public void Insert(AuthToken auth){
		repository.save(auth);
	}
	
	@Transactional
	public AuthToken GetByToken(String token) {
		for (AuthToken auth : repository.findAll()) {
			if(auth.getToken().equals(token)) return auth;
		}
		return null;
	}
	
	@Transactional
	public void DeleteTokensForUser(Long user_id) {
		for (AuthToken auth : repository.findAll()) {
			if(auth.getUser().getId().equals(user_id))
				auth.setDeleted(true);
		}
	}
}
