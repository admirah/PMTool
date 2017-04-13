package viewmodels;

import org.joda.time.DateTime;

public class FinishedTask {
	private int userId;
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	private String taskName;
	private DateTime finishedOn;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public DateTime getFinishedOn() {
		return finishedOn;
	}
	public void setFinishedOn(DateTime finishedOn) {
		this.finishedOn = finishedOn;
	}
	public FinishedTask(int userId, String name, String taskName, DateTime finishedOn) {
		super();
		this.userId = userId;
		this.name = name;
		this.taskName = taskName;
		this.finishedOn = finishedOn;
	}
	
}
