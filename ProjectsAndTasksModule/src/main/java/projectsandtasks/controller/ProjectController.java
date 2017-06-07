package projectsandtasks.controller;

import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.Member;
import projectsandtasks.models.Project;
import projectsandtasks.models.Task;
import projectsandtasks.models.UserModel;
import projectsandtasks.repository.MemberRepository;
import projectsandtasks.repository.ProjectRepository;
import projectsandtasks.repository.TaskRepository;
import projectsandtasks.repository.UsersRepository;

import java.util.ArrayList;
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
    @Autowired
    private MemberRepository members;
    @Autowired
    private TaskRepository tasks;


    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<List<UserModel>> GetUsers() {
        return users.Get();
    }

    @RequestMapping(value = "/project", method = RequestMethod.GET)
    public List<Project> GetProjectsByOwner(@RequestParam("userid") int userid) {
        return repository.getByUser(userid);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Project> Get(@PathVariable("id") Long id) {
        try {
            Project project = repository.findById(id);
            if (project != null) return new ResponseEntity<Project>(project, HttpStatus.OK);
        } catch (Exception e) {

        }
        return new ResponseEntity(new ResponseModel("User not found"), HttpStatus.NOT_FOUND);

    }

    @RequestMapping(value = "/projectMember", method = RequestMethod.GET)
    public List<Project> GetProjectsByMember(@RequestParam("userid") int userid) {
        List<Member> membersList = members.findAll();
        ArrayList<Project> projectsList = new ArrayList<Project>();
        for (Member m : membersList) {
            if (userid == m.getUserId()) projectsList.add((Project) repository.findById(m.getProject().getId()));
        }
        return projectsList;
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

    //broj taskova po useru
    @RequestMapping(value = "/numberoftasks", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> finishedTasksGroupedBy(@RequestParam(value = "projectId") Long projectId, @RequestParam(value = "userId") Long userId) {
        int total = tasks.findAll().stream().filter(x -> {
            return x.getOwner() == userId && x.getProject().getId() == projectId;
        }).toArray().length;
        return new ResponseEntity<String>(Integer.toString(total), HttpStatus.OK);
    }

}
