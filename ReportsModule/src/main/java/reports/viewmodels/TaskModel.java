package reports.viewmodels;

import java.util.Date;

public class TaskModel {
	private String name;
	private String description;
	private Date startedOn;
    private Date endOn;
    private String weight;
    private String status;
	
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
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
