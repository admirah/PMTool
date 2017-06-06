package projectsandtasks.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.*;
import projectsandtasks.repository.MemberRepository;
import projectsandtasks.repository.ProjectRepository;
import projectsandtasks.repository.UsersRepository;
import projectsandtasks.viewmodels.ProjectMembersModel;
import projectsandtasks.viewmodels.ProjectModel;
import projectsandtasks.viewmodels.ReportModel;
import projectsandtasks.viewmodels.TaskModel;
import projectsandtasks.viewmodels.UsersIds;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public ResponseEntity<List<UserModel>> GetUsers() {
		return users.Get();
	}

	@RequestMapping(value = "/project", method = RequestMethod.GET)
	public List<Project> GetProjectsByOwner(@RequestParam("userid") int userid) {
		return repository.getByUser(userid);
	}

	@RequestMapping(value = "/projectMember", method = RequestMethod.GET)
	public List<Project> GetProjectsByMember(@RequestParam("userid") int userid) {
		List<Member> membersList = members.findAll();
		ArrayList<Project> projectsList = new ArrayList<Project>();
		for (Member m : membersList) {
			if (userid == m.getUserId())
				projectsList.add((Project) repository.findById(m.getProject().getId()));
		}
		return projectsList;
	}

	@RequestMapping(value = "/member", method = RequestMethod.POST)
	public ResponseEntity<ProjectMembersModel> Insert(@RequestBody ProjectMembersModel project) {
		System.out.println("TUUUU SAAAAM");
		System.out.println(project.getName());
		if (project == null)
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		List<Member> memberss = new ArrayList<>();
		try {
			Project pr = new Project(project.getName(), project.getCreatedOn(), project.getFinishedOn(),
					project.getDescription(), project.getOwner(), project.getStartedOn(), project.getEndOn(),
					new ArrayList<>(), new ArrayList<>());
			repository.save(pr);
			for (UserModel u : project.getMembers()) {
				{
					System.out.println(project.getName());

					Member m = new Member();
					m.setUserId(Math.toIntExact(u.getId()));
					Project p = repository.findByName(project.getName());
					m.setProject(p);
					memberss.add(m);
					p.setMembers(memberss);

					repository.save(p);
					System.out.println(project.getName());

					members.save(m);
				}
			}
		} catch (Exception e) {
			return new ResponseEntity<ProjectMembersModel>(project, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<ProjectMembersModel>(project, HttpStatus.OK);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<ProjectMembersModel> Update(@RequestBody ProjectMembersModel project) {
		if (project == null)
			return new ResponseEntity(HttpStatus.BAD_REQUEST);
		try {
			Project pr = repository.findById(project.getId());
			pr.setName(project.getName());
			pr.setDescription(project.getDescription());
			pr.setOwner(project.getOwner());
			pr.setStartedOn(pr.getStartedOn());
			pr.setEndOn(project.getEndOn());
			repository.save(pr);
			members.delete(pr.getMembers());

			for (UserModel u : project.getMembers()) {

				Member m = new Member();
				m.setUserId(Math.toIntExact(u.getId()));

				m.setProject(pr);

				members.save(m);
			}
		} catch (Exception e) {
			return new ResponseEntity<ProjectMembersModel>(project, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<ProjectMembersModel>(project, HttpStatus.OK);
	}

	@RequestMapping(value = "/numberoftasks", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<String> finishedTasksGroupedBy(@RequestParam(value = "projectId") Long projectId,
			@RequestParam(value = "userId") Long userId) {
		int total = repository.findAll().stream().filter(x -> {
			return x.getOwner() == userId && x.getId() == projectId;
		}).toArray().length;
		return new ResponseEntity<String>(Integer.toString(total), HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<Project> GetProjec(@PathVariable("id") Long id) {
		return new ResponseEntity<Project>(repository.findById(id), HttpStatus.OK);
	}

	@RequestMapping(value = "/report/{id}", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<ReportModel> GetById(@PathVariable("id") Long id) {
		Project p = repository.findById(id);

		ProjectModel pm = new ProjectModel();
		pm.setCreatedOn(p.getCreatedOn());
		pm.setDescription(p.getDescription());
		pm.setEndOn(p.getEndOn());
		pm.setFinishedOn(p.getFinishedOn());
		pm.setId(pm.getId());
		/*
		 * UsersIds ids = new UsersIds(); List<Long> liId = new
		 * ArrayList<Long>(); for (Member m : p.getMembers()) {
		 * liId.add(m.getId()); } ids.setIds(liId);
		 * pm.setMembers(users.GetByIds(ids).getBody());
		 */
		pm.setName(p.getName());
		pm.setOwner(pm.getOwner());
		pm.setStartedOn(p.getStartedOn());
		/*
		 * List<TaskModel> tl = new ArrayList<TaskModel>(); for(Task t :
		 * p.getTasks()) { TaskModel tm = new TaskModel();
		 * tm.setDescription(t.getDescription()); tm.setEndOn(t.getEndOn());
		 * tm.setName(t.getName()); tm.setStartedOn(t.getStartedOn());
		 * tm.setTaskStatus(t.getTaskStatus()); tm.setWeight(t.getWeight());
		 * tl.add(tm); } pm.setTasks(tl);
		 */

		ReportModel result = new ReportModel();

		result.setProject(pm);
		result.setNumberOfMembers(p.getMembers().size());
		result.setNumberOfTasks(p.getTasks().size());
		result.setTasksDone(p.getTasks().stream().filter(x -> x.getFinishedOn() != null).toArray().length);

		Map<String, Integer> map = new HashMap<String, Integer>();

		for (TaskStatusEnum tsk : TaskStatusEnum.values()) {
			map.put(tsk.toString(), 0);
		}

		for (Task t : p.getTasks()) {
			int count = map.containsKey(t.getTaskStatus().toString()) ? map.get(t.getTaskStatus().toString()) : 0;
			map.put(t.getTaskStatus().toString(), count + 1);
		}

		result.setTasksInStatus(map);

		Map<String, Integer> map2 = new HashMap<String, Integer>();

		for (WeightEnum tsk : WeightEnum.values()) {
			map2.put(tsk.toString(), 0);
		}

		for (Task t : p.getTasks()) {
			int count = map2.containsKey(t.getWeight().toString()) ? map2.get(t.getWeight().toString()) : 0;
			map2.put(t.getWeight().toString(), count + 1);
		}
		
		result.setTasksInWeights(map2);

		return new ResponseEntity<ReportModel>(result, HttpStatus.OK);

	}

}
