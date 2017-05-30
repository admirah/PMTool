package projectsandtasks.controller;

import com.google.common.collect.Iterables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.Member;
import projectsandtasks.models.Project;
import projectsandtasks.models.UserModel;
import projectsandtasks.repository.MemberRepository;
import projectsandtasks.repository.ProjectRepository;
import projectsandtasks.repository.UsersRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Vejsil on 28.03.2017..
 */
@RestController
@RequestMapping(value = "/member", produces = "application/json", consumes = "application/json")
public class MemberController {

  @Autowired
  private UsersRepository users;
  @Autowired
  private MemberRepository members;
  @Autowired
  private ProjectRepository projects;

  @RequestMapping(value = "/add-to-project", method = RequestMethod.POST)
  public ResponseEntity<UserModel> Insert(@RequestBody AddNewMember addNewMemberReq) {
    if (addNewMemberReq == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
    UserModel userToAdd = null;
    try {
      List<UserModel> filteredUsers = users.Get().getBody().stream().filter(item -> item.getUsername().equals(addNewMemberReq.username)).collect(Collectors.toList());
      List<Project> filteredProjects = projects.findAll().stream().filter(item -> item.getId() == addNewMemberReq.projectId).collect(Collectors.toList());
      Project project = filteredProjects.iterator().next();
      userToAdd = filteredUsers.iterator().next();
      Member newMember = new Member(userToAdd.getId(), project);
      members.save(newMember);
    } catch (Exception e) {
      return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<UserModel>(userToAdd, HttpStatus.OK);
  }


  @RequestMapping(value = "/onproject", method = RequestMethod.GET)
  public ResponseEntity<List<UserModel>> GetMembersOnProject(@RequestParam(value = "projectId") Long projectId) {
    if (projectId == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
    List<UserModel> filteredUsers = null;
    try {
      List<Project> filteredProjects = projects.findAll().stream().filter(item -> item.getId() == projectId).collect(Collectors.toList());
      Project project = filteredProjects.iterator().next();
      filteredUsers = users.Get().getBody().stream().filter(item -> isMember(project.getProjects(), item.getId())).collect(Collectors.toList());
    } catch (Exception e) {
      return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<List<UserModel>>(filteredUsers, HttpStatus.OK);
  }

  @RequestMapping(value = "/notonproject", method = RequestMethod.GET)
  public ResponseEntity<List<UserModel>> GetMembersNotOnProject(@RequestParam(value = "projectId") Long projectId) {
    if (projectId == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
    List<UserModel> filteredUsers = null;
    try {
      List<Project> filteredProjects = projects.findAll().stream().filter(item -> item.getId() == projectId).collect(Collectors.toList());
      Project project = filteredProjects.iterator().next();
      filteredUsers = users.Get().getBody().stream().filter(item -> !isMember(project.getProjects(), item.getId())).collect(Collectors.toList());
    } catch (Exception e) {
      return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<List<UserModel>>(filteredUsers, HttpStatus.OK);
  }

  public static Boolean isMember(List<Member> members, Long userId){
    for(Member mmb : members){
      if(mmb.getUserId().equals(userId)) return true;
    }
    return false;
  }
}


class AddNewMember {
  public String username;
  public int projectId;
}
