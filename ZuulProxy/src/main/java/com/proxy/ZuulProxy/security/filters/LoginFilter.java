package com.proxy.ZuulProxy.security.filters;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcherEditor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proxy.ZuulProxy.security.exceptions.UserAuthenticationException;
import com.proxy.ZuulProxy.security.models.AuthTokenModel;
import com.proxy.ZuulProxy.security.services.UserService;


public class LoginFilter extends AbstractAuthenticationProcessingFilter {

    private UserService userService;

	public LoginFilter(RequestMatcher requiresAuthenticationRequestMatcher, UserService userService) {
		super(requiresAuthenticationRequestMatcher);
		this.userService = userService;
	}

	private Logger logger = LogManager.getLogger(LoginFilter.class);

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {
				
		AuthTokenModel auth = new AuthTokenModel();
		
		try {
			
			final String authorization = request.getHeader("Authorization") != null ? request.getHeader("Authorization") : null;
			
			if(authorization != null) {
				String credentials = authorization.split(" ")[1];
				String valueDecoded = new String(Base64.decodeBase64(credentials.getBytes()));
				
				String username = valueDecoded.split(":")[0];
				String password = valueDecoded.split(":")[1];
				
				Map<String, String> cr = new HashMap<>();
				cr.put("username", username);
				cr.put("password", password);
					
				auth = userService.authenticate(cr);
				
				if(auth.isAuthenticated()) return auth;
				
				throw new UserAuthenticationException("Error");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			auth.setAuthenticated(false);
			throw new UserAuthenticationException("Bad credentials");
		}
		
		return auth;
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			javax.servlet.FilterChain chain, Authentication authResult) throws IOException, ServletException {
		
		AuthTokenModel result = (AuthTokenModel) authResult;
		
		HashMap<String, Object> information = new HashMap<>();
		information.put("token", result.getToken());
		information.put("expiration", result.getExpiration());
		information.put("username", result.getUsername());
		information.put("id", result.getUserId());
		
		ObjectMapper mapper = new ObjectMapper();
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(mapper.writeValueAsString(information));
	}
	
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {

		HashMap<String, Object> information = new HashMap<>();
		information.put("Error", failed.getMessage());

		ObjectMapper mapper = new ObjectMapper();
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(mapper.writeValueAsString(information));

	}

}
