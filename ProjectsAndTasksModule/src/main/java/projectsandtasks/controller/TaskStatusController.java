package projectsandtasks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import projectsandtasks.repository.TaskStatusRepository;
import org.springframework.http.ResponseEntity;


import javax.xml.ws.Response;

/**
 * Created by Vejsil on 16.04.2017..
 */
@Controller
@RestController
@RequestMapping(value = "/task", produces = "application/json")
public class TaskStatusController {
    @Autowired
    private TaskStatusRepository repository;
    @RequestMapping(value = "/numberoftasks", method = RequestMethod.GET, produces = "application/json")
    public int finishedTasksGroupedBy(@RequestParam(value = "projectId") Long projectId, @RequestParam(value="userId") Long userId) {
        int total = repository.findAll().stream().filter(x -> {return x.getProject().getOwner() == userId && x.getProject().getId() == projectId;}).toArray().length;
        return total;
    }
}
