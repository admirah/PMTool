package projectsandtasks.controller;

import org.hibernate.sql.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.Project;
import projectsandtasks.repository.ProjectRepository;

import java.util.List;

/**
 * Created by Vejsil on 28.03.2017..
 */

@RestController
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectRepository repository;

    @RequestMapping(value = "", method = RequestMethod.PATCH, produces = "application/json")
    public ResponseEntity<Project> Update(@RequestBody Project project) {
        if (project == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        try {
            repository.save(project);
        } catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json")
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
