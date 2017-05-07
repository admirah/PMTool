package users.models;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class AuthTokenModel implements Authentication {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3529637759726296163L;

	public AuthTokenModel() {}
	
	private String token;
	private Date expiration;
	private String username;
	private boolean isAuthenticated;
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Date getExpiration() {
		return expiration;
	}
	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return getUsername();
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Object getCredentials() {
		// TODO Auto-generated method stub
		return getUsername();
	}
	@Override
	public Object getDetails() {
		// TODO Auto-generated method stub
		return getUsername();
	}
	@Override
	public Object getPrincipal() {
		// TODO Auto-generated method stub
		return getUsername();
	}
	@Override
	public boolean isAuthenticated() {
		// TODO Auto-generated method stub
		return isAuthenticated;
	}
	@Override
	public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
		this.isAuthenticated = isAuthenticated;
	}
}
