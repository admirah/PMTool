package projectsandtasks.viewmodels;

import java.util.Date;

public class FinishedTask {
	private Long userId;
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String taskName;
	private Date finishedOn;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public Date getFinishedOn() {
		return finishedOn;
	}
	public void setFinishedOn(Date finishedOn) {
		this.finishedOn = finishedOn;
	}
	public FinishedTask(Long userId, String name, String taskName, Date date) {
		super();
		this.userId = userId;
		this.name = name;
		this.taskName = taskName;
		this.finishedOn = date;
	}
}
