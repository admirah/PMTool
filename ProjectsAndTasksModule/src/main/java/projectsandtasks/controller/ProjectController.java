package projectsandtasks.controller;

import org.hibernate.sql.Insert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectsandtasks.Application;
import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.Project;
import projectsandtasks.models.UserModel;
import projectsandtasks.repository.ProjectRepository;
import projectsandtasks.repository.UsersRepository;

import java.util.List;

/**
 * Created by Vejsil on 28.03.2017..
 */
@RestController
@RequestMapping(value = "/project", produces = "application/json")
public class ProjectController {
	
    @Autowired
    private ProjectRepository repository;
    @Autowired 
	private UsersRepository users;
    
    @RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<List<UserModel>> GetUsers() {
    	return users.Get();
	}
        
    @RequestMapping(value = "", method = RequestMethod.PATCH)
    public ResponseEntity<Project> Update(@RequestBody Project project) {
        if (project == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        try {
            repository.save(project);
        } catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Project> Insert(@RequestBody Project project) {
        if (project == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        try {
            repository.save(project);
        } catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

}
