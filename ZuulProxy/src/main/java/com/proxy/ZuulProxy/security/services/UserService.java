package com.proxy.ZuulProxy.security.services;

import java.util.Map;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.proxy.ZuulProxy.FeignConfiguration;
import com.proxy.ZuulProxy.security.models.AuthTokenModel;


@FeignClient(name = "users-module", configuration = FeignConfiguration.class)
public interface UserService {
	
	@RequestMapping(value = "users/authenticate", method = RequestMethod.POST, produces = "application/json")
	public AuthTokenModel authenticate(@RequestParam Map<String,String> credentials);
	
	@RequestMapping(value = "users/authorize", method = RequestMethod.POST, produces = "application/json")
	public AuthTokenModel authorize(@RequestParam Map<String,String> tkn);

}
