package users.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UserAuthenticationException extends AuthenticationException{

	private static final long serialVersionUID = 3356606184917713565L;
	
	
	
	public UserAuthenticationException(String msg) {
		super(msg);
	}
	

}
