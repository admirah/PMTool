package projectsandtasks.controller;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import projectsandtasks.models.UserModel;
import projectsandtasks.models.WeightEnum;
import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.Project;
import projectsandtasks.models.Task;
import projectsandtasks.models.TaskStatusEnum;
import org.springframework.web.bind.annotation.*;
import projectsandtasks.helpers.ResponseModel;
import projectsandtasks.models.*;
import projectsandtasks.repository.CommentRepository;
import projectsandtasks.repository.ProjectRepository;
import projectsandtasks.repository.TaskRepository;
import projectsandtasks.repository.UsersRepository;
import projectsandtasks.viewmodels.FinishedTask;
import projectsandtasks.viewmodels.FinishedTaskGrouped;
import projectsandtasks.viewmodels.FinishedTaskGroupedTotal;
import projectsandtasks.viewmodels.TaskModel;
import projectsandtasks.viewmodels.UsersIds;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Vejsil on 28.03.2017..
 */
@Controller
@RestController
@RequestMapping(value = "/tasks", produces = "application/json")
public class TaskController {

    @Autowired
    private TaskRepository repository;
    @Autowired
    private UsersRepository uRepository;


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Task> Update(@PathVariable Long id,@RequestBody TaskModel model) {
    	Task task = repository.findById(id);
        if (task == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        try {
        	task.setName(model.getName());
        	task.setDescription(model.getDescription());
        	task.setStartedOn(model.getStartedOn());
        	task.setEndOn(model.getEndOn());
        	task.setTaskStatus(model.getTaskStatus());
        	task.setWeight(model.getWeight());
        	if(model.getTaskStatus() == TaskStatusEnum.DONE) task.setFinishedOn(new Date());
        	else task.setFinishedOn(null);
            repository.save(task);
        } catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Task>(task, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<ResponseModel> Update(@PathVariable Long id) {
    	Task task = repository.findById(id);
        if (task == null) return new ResponseEntity<ResponseModel>(new ResponseModel("Something went wrong"), HttpStatus.BAD_REQUEST);
        try {
            repository.delete(id);
        } catch (Exception e) {
            return new ResponseEntity<ResponseModel>(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<ResponseModel>(new ResponseModel("OK"), HttpStatus.OK);
    }
    @Autowired
    private ProjectRepository pRepository;
    @Autowired
    private CommentRepository commentRepository;

	@RequestMapping(value = "/finished", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<ArrayList<projectsandtasks.viewmodels.FinishedTask>> finishedTasks(@RequestParam(value="projectId") Long projectId) {
		List<projectsandtasks.models.Task> tasks = new ArrayList<>();
		repository.findAll().stream().filter(x -> {return (x.getProject().getId() == projectId && x.getFinishedOn() != null);}).map(x -> new projectsandtasks.models.Task(x))
				.forEach(x -> tasks.add(x));
    	ArrayList<FinishedTask> finishedTasks = new ArrayList<FinishedTask>();
    	ArrayList<Long> idovi = new ArrayList<Long>();
    	for(projectsandtasks.models.Task task: tasks)
    		idovi.add(task.getId());
    	UsersIds userIDs = new UsersIds();
        userIDs.setIds(idovi);
        ArrayList<UserModel> sviUseri = (ArrayList<UserModel>) uRepository.GetByIds(userIDs).getBody();
        for (projectsandtasks.models.Task task : tasks) {
            finishedTasks.add(new FinishedTask(task.getId(), this.getUserName(sviUseri, task.getId()), task.getName(), task.getFinishedOn()));
        }
        return new ResponseEntity<ArrayList<FinishedTask>>(finishedTasks, HttpStatus.OK);
    }

	@RequestMapping(value = "/finished/grouped", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<FinishedTaskGroupedTotal> finishedTasksGroupedBy (@RequestParam(value="taskStatus") Long taskStatus){
		Date dateBefore30Days = DateUtils.addDays(new Date(),-30); //day 30 days ago
		ArrayList<FinishedTaskGrouped> finishedTasksGroupedList = new ArrayList<FinishedTaskGrouped>();
    	repository.findAll().stream().filter(x -> {return (x.getTaskStatus().getValue() == taskStatus && x.getFinishedOn() != null && x.getFinishedOn().compareTo(dateBefore30Days) > 0);}).map(x -> new FinishedTaskGrouped(x.getTaskStatus().getValue(),x.getName(),x.getFinishedOn(),x.getWeight().toString(),x.getWeight().getValue())).forEach((x -> finishedTasksGroupedList.add(x)));
    	int totalWeight = 0;
    	for(FinishedTaskGrouped ftG: finishedTasksGroupedList){
    		totalWeight += ftG.getWeightValue();
		}
		FinishedTaskGroupedTotal finishedTaskGroupedTotal = new FinishedTaskGroupedTotal(finishedTasksGroupedList, totalWeight);
    	return new ResponseEntity<FinishedTaskGroupedTotal>(finishedTaskGroupedTotal, HttpStatus.OK);
	}

    private String getUserName(List<UserModel> sviUseri, Long id) {
        for (UserModel user : sviUseri) {
            if (user.getId() == id) return user.getName();
        }
        return null;
    }


    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    public ResponseEntity<Comment> Insert(@RequestBody CommentModel comm) {
        if (comm == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        try {
            Task task = repository.findById(comm.getTask());
            Comment comment = new Comment();
            comment.setCreatedOn(new Date());
            comment.setContent(comm.getContent());
            comment.setTask(task);
            comment.setUser(Long.valueOf(comm.getUser()));
            commentRepository.save(comment);
            return new ResponseEntity<Comment>(comment, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Task> Insert(@RequestBody TaskMModel taskModel) {
        if (taskModel == null) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        try {
            Project project = pRepository.findById(taskModel.getProjectId());
            Task task = new Task();
            task.setName(taskModel.getName());
            task.setCreatedOn(new Date());
            task.setDescription(taskModel.getDescription());
            task.setProject(project);
            task.setWeight(taskModel.getWeight());
            task.setOwner(taskModel.getOwner());
            task.setTaskStatus(taskModel.getTaskStatus());
            repository.save(task);
            return new ResponseEntity<Task>(task, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }

    }


}

class CommentModel {
    public CommentModel() {
    }

    private String content;
    private Integer user;
    private Long task;


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getUser() {
        return user;
    }

    public void setUser(Integer user) {
        this.user = user;
    }

    public Long getTask() {
        return task;
    }

    public void setTask(Long task) {
        this.task = task;
    }


}

class TaskMModel {
    public TaskMModel() {
    }

    private String description;
    private String name;
    private Long owner;
    private Long projectId;
    private TaskStatusEnum taskStatus;
private WeightEnum weight;
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getOwner() {
        return owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public TaskStatusEnum getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatusEnum taskStatus) {
        this.taskStatus = taskStatus;
    }

    public WeightEnum getWeight() {
        return weight;
    }

    public void setWeight(WeightEnum weight) {
        this.weight = weight;
    }
}

