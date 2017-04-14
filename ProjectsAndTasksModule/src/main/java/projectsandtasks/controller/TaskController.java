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
import projectsandtasks.viewmodels.FinishedTask;
import projectsandtasks.viewmodels.UsersIds;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private UsersRepository uRepository;
    
	public ResponseEntity<List<projectsandtasks.viewmodels.FinishedTask>> finishedTasks() {
    	ArrayList<projectsandtasks.models.Task> tasks = (ArrayList<projectsandtasks.models.Task>) repository.getAllFinishedTasksForProject();
    	ArrayList<FinishedTask> finishedTasks = new ArrayList<FinishedTask>();
    	ArrayList<Long> idovi = new ArrayList<Long>();
    	for(projectsandtasks.models.Task task: tasks)
    		idovi.add(task.getId());
    	UsersIds userIDs = new UsersIds();
        userIDs.setIds(idovi);
    	List<UserModel> sviUseri = uRepository.GetByIds(userIDs).getBody();
    	for(projectsandtasks.models.Task task: tasks){
    		finishedTasks.add(new FinishedTask(task.getId(), this.getUserName(sviUseri, task.getId()), task.getName(), task.getFinishedOn()));
    	}
    	return new ResponseEntity<List<projectsandtasks.viewmodels.FinishedTask>>(finishedTasks, HttpStatus.OK);
	}
    
    private String getUserName(List<UserModel> sviUseri, Long id){
    	for(UserModel user: sviUseri){
    		if(user.getId() == id) return user.getName();
    	}
		return null;
    }

}
