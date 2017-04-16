package reports.viewmodels;

import java.util.Date;

/**
 * Created by Emina on 16.04.2017..
 */
public class FinishedTask {
    private Long userId;
    private String name;
    private String taskName;
    private Date finishedOn;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
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

    public FinishedTask(){}
    public FinishedTask(Long userId, String name, String taskName, Date date) {
        super();
        this.userId = userId;
        this.name = name;
        this.taskName = taskName;
        this.finishedOn = date;
    }
    public FinishedTask(FinishedTask t)
    {
        this.finishedOn=t.getFinishedOn();
        this.name=t.getName();
        this.taskName=t.getTaskName();
        this.userId=t.getUserId();
    }

}

