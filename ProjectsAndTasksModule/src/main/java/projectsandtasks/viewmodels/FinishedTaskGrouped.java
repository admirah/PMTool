package projectsandtasks.viewmodels;

import projectsandtasks.models.Task;
import projectsandtasks.models.TaskStatus;
import projectsandtasks.models.Weight;

import java.util.Date;

/**
 * Created by Vejsil on 15.04.2017..
 */
public class FinishedTaskGrouped {

    private TaskStatus taskStatus;
    private String name;
    private Weight weight;
    private Date finishedOn;

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Weight getWeight() {
        return weight;
    }

    public void setWeight(Weight weight) {
        this.weight = weight;
    }

    public Date getFinishedOn() {
        return finishedOn;
    }

    public void setFinishedOn(Date finishedOn) {
        this.finishedOn = finishedOn;
    }


    public FinishedTaskGrouped(Task task){
        this.taskStatus = task.getTaskStatus();
        this.name = task.getName();
        this.weight = task.getWeight();
        this.finishedOn = task.getFinishedOn();
    }
}
