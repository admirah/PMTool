package projectsandtasks.viewmodels;

import java.util.List;

public class FinishedTasksReq {
	private Long projectId;

	public FinishedTasksReq(Long projectId) {
		super();
		this.projectId = projectId;
	}
	
	public FinishedTasksReq() {
		super();	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}
}
