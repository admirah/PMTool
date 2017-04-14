package reports.viewmodels;

import java.util.Date;

/**
 * Created by Emina on 14.04.2017..
 */
public class TaskModel {
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
    public int weightValue;
    public int getWeightValue() {return weightValue;}
    public void setWeightValue(int val) {this.weightValue=val;}

}
