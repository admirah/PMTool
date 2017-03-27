package com.pmtool.users;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	//static final Logger logger = LogManager.getLogger(ProjectManagementToolApplication.class.getName());

	public static void main(String[] args) {
		//logger.info("Application entered");
		SpringApplication.run(Application.class, args);
	}
}
