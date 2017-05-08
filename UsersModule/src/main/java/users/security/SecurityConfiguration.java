package users.security;

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
import users.security.filter.AuthFilter;
import users.security.filter.LoginFilter;
import users.services.AuthTokenService;
import users.services.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthTokenService authTokenService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
        .authorizeRequests()
        .anyRequest().authenticated()
        .and().httpBasic()
        .authenticationEntryPoint(getBasicAuthEntryPoint())
        .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and().addFilterBefore(new LoginFilter(new AntPathRequestMatcher("/login"), userService, authTokenService), UsernamePasswordAuthenticationFilter.class)
        .addFilterBefore(new AuthFilter(userService, authTokenService), UsernamePasswordAuthenticationFilter.class);
		
	}
	
	@Bean
    public UserBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
        return new UserBasicAuthenticationEntryPoint();
    }
     
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.POST, "/users/register");
    }
    
}
