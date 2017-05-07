package users.security.filter;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import users.database.AuthToken;
import users.models.AuthTokenModel;
import users.services.AuthTokenService;
import users.services.UserService;

public class AuthFilter extends GenericFilterBean {
	
	private Logger logger = LogManager.getLogger(AuthFilter.class);
	private UserService userService;
	private AuthTokenService authTokenService;
	
	public AuthFilter(UserService userService, AuthTokenService authTokenService) {
		this.userService = userService;
		this.authTokenService = authTokenService;
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		String token = httpRequest.getHeader("Token");
		
		boolean OK = false;
		
		if(token != null) {
			AuthToken authToken = authTokenService.GetByToken(token);
			if(authToken != null) {
				
				OK = true;
				
				AuthTokenModel result = new AuthTokenModel();
				result.setAuthenticated(true);
				result.setExpiration(authToken.getExpiration());
				result.setToken(authToken.getToken());
				result.setUsername(authToken.getUser().getUsername());
				
				SecurityContextHolder.getContext().setAuthentication(result);
				
				filterChain.doFilter(request, response);
			}
		}
 
		
		if(!OK) { 
			HashMap<String, Object> information = new HashMap<>();
			information.put("Error", "Bad token");
			
			ObjectMapper mapper = new ObjectMapper();
			httpResponse.setCharacterEncoding("UTF-8");
			httpResponse.getWriter().write(mapper.writeValueAsString(information));
		}
		
	}

}
