package projectsandtasks.controller;

import org.h2.util.Task;
import org.hibernate.sql.Insert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import projectsandtasks.Application;
import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.Project;
import projectsandtasks.models.UserModel;
import projectsandtasks.repository.ProjectRepository;
import projectsandtasks.repository.TaskRepository;
import projectsandtasks.repository.UsersRepository;
import viewmodels.FinishedTask;

import java.util.List;

/**
 * Created by Vejsil on 28.03.2017..
 */
@Controller
@RestController
@RequestMapping(value = "/task", produces = "application/json")
public class TaskController {
	
    @Autowired
    private TaskRepository repository;
    @Autowired 
    

    @RequestMapping(value="/finished")
	public ResponseEntity<List<projectsandtasks.models.Task>> finishedTasks(@RequestParam("projectid") Long projectid) {
    	System.out.println("HEHEH");
    	List<projectsandtasks.models.Task> tasks = repository.getAllFinishedTasksForProject();
    	return new ResponseEntity<List<projectsandtasks.models.Task>>(tasks, HttpStatus.OK);
	}

}
