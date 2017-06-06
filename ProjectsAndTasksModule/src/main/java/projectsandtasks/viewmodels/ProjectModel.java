package projectsandtasks.viewmodels;

import java.util.Date;
import java.util.List;

import projectsandtasks.models.UserModel;

public class ProjectModel {
	private Long id;
	private String name;
	private Date createdOn;
	private Date finishedOn;
	private String description;
	private int owner;
	private Date startedOn;
	private Date endOn;
	private List<UserModel> members;
	private List<TaskModel> tasks;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}
	public Date getFinishedOn() {
		return finishedOn;
	}
	public void setFinishedOn(Date finishedOn) {
		this.finishedOn = finishedOn;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getOwner() {
		return owner;
	}
	public void setOwner(int owner) {
		this.owner = owner;
	}
	public Date getStartedOn() {
		return startedOn;
	}
	public void setStartedOn(Date startedOn) {
		this.startedOn = startedOn;
	}
	public Date getEndOn() {
		return endOn;
	}
	public void setEndOn(Date endOn) {
		this.endOn = endOn;
	}
	public List<UserModel> getMembers() {
		return members;
	}
	public void setMembers(List<UserModel> members) {
		this.members = members;
	}
	public List<TaskModel> getTasks() {
		return tasks;
	}
	public void setTasks(List<TaskModel> tasks) {
		this.tasks = tasks;
	}
}
