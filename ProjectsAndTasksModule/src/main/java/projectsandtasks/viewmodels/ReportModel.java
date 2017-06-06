package projectsandtasks.viewmodels;

import java.util.Map;

public class ReportModel {

	private ProjectModel project;
	private int numberOfTasks;
	private int numberOfMembers;
	private int tasksDone;
	private Map<String, Integer> tasksInStatus;
	private Map<String, Integer> tasksInWeights;
	
	public ProjectModel getProject() {
		return project;
	}
	public void setProject(ProjectModel projectName) {
		this.project = projectName;
	}
	
	public int getNumberOfTasks() {
		return numberOfTasks;
	}
	public void setNumberOfTasks(int numberOfTasks) {
		this.numberOfTasks = numberOfTasks;
	}
	public int getNumberOfMembers() {
		return numberOfMembers;
	}
	public void setNumberOfMembers(int numberOfMembers) {
		this.numberOfMembers = numberOfMembers;
	}
	public int getTasksDone() {
		return tasksDone;
	}
	public void setTasksDone(int tasksDone) {
		this.tasksDone = tasksDone;
	}
	public Map<String, Integer> getTasksInStatus() {
		return tasksInStatus;
	}
	public void setTasksInStatus(Map<String, Integer> tasksInStatus) {
		this.tasksInStatus = tasksInStatus;
	}
	public Map<String, Integer> getTasksInWeights() {
		return tasksInWeights;
	}
	public void setTasksInWeights(Map<String, Integer> tasksInWeights) {
		this.tasksInWeights = tasksInWeights;
	}
	
}
