package projectsandtasks.viewmodels;

import java.util.Date;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import projectsandtasks.models.TaskStatusEnum;
import projectsandtasks.models.WeightEnum;

public class TaskModel {
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public TaskStatusEnum getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(TaskStatusEnum taskStatus) {
		this.taskStatus = taskStatus;
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
	private String description;
	@Enumerated(EnumType.ORDINAL)
	private TaskStatusEnum taskStatus;
	@Enumerated(EnumType.ORDINAL)
	private WeightEnum weight;
	public WeightEnum getWeight() {
		return weight;
	}
	public void setWeight(WeightEnum weight) {
		this.weight = weight;
	}
	private Date startedOn;
    private Date endOn;
}
