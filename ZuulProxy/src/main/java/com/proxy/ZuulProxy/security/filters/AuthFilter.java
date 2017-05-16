package com.proxy.ZuulProxy.security.filters;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proxy.ZuulProxy.security.models.AuthTokenModel;
import com.proxy.ZuulProxy.security.services.UserService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class AuthFilter extends GenericFilterBean {
	
	private Logger logger = LogManager.getLogger(AuthFilter.class);
	private UserService userService;
	
	public AuthFilter(UserService userService) {
		this.userService = userService;
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		String token = httpRequest.getHeader("Token");
		
		Map<String, String> tkn = new HashMap<>();
		tkn.put("token", token);
		
		AuthTokenModel result = userService.authorize(tkn);
		
		if(result != null) {
			SecurityContextHolder.getContext().setAuthentication(result);
			filterChain.doFilter(request, response);
		}
		else {
		
			HashMap<String, Object> information = new HashMap<>();
			information.put("Error", "Bad token");
			
			ObjectMapper mapper = new ObjectMapper();
			httpResponse.setCharacterEncoding("UTF-8");
			httpResponse.getWriter().write(mapper.writeValueAsString(information));
		}
		
	}

}
