package com.proxy.ZuulProxy.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.proxy.ZuulProxy.security.filters.AuthFilter;
import com.proxy.ZuulProxy.security.filters.LoginFilter;
import com.proxy.ZuulProxy.security.services.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserService userService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.cors()
		.and()
		.csrf().disable()
        .authorizeRequests()
        .antMatchers("/users/authenticate", "/users/authorize").permitAll()
        .and()
        .authorizeRequests()
        .anyRequest().authenticated()
        .and()
        .httpBasic()
        .authenticationEntryPoint(getBasicAuthEntryPoint())
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .addFilterBefore(new LoginFilter(new AntPathRequestMatcher("/login"), userService), UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(new AuthFilter(userService), UsernamePasswordAuthenticationFilter.class);
		
	}
	
	@Bean
    public UserBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
        return new UserBasicAuthenticationEntryPoint();
    }
     
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST, "/users/users/register");
    }
    
}
