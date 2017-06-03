package projectsandtasks.viewmodels;

import projectsandtasks.models.Task;
import projectsandtasks.models.UserModel;

import java.util.Date;
import java.util.List;

/**
 * Created by Emina on 01.06.2017..
 */
public class ProjectMembersModel {
   private Long id;
    private String name;
   private Date createdOn;
    private Date finishedOn;
   private String description;
    private int owner;
    private Date startedOn;
   private Date endOn;
    private List<UserModel> members;
    private List<Task> tasks;

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


    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
    public void setMembers(List<UserModel> users)
    {
        System.out.println("TUUUU TUUUUUU");

        this.members=users;
    }
    public List<UserModel> getMembers(){
        return this.members;
    }
    protected ProjectMembersModel () {    }

    public ProjectMembersModel(String name, Date createdOn, Date finishedOn, String description, int owner, Date startedOn, Date endOn, List<UserModel> members, List<Task> tasks) {
        this.name = name;
        this.createdOn = createdOn;
        this.finishedOn = finishedOn;
        this.description = description;
        this.owner = owner;
        this.startedOn = startedOn;
        this.endOn = endOn;
        this.members = members;
        this.tasks = tasks;
        System.out.println("TUUUU TUUUUUU");

    }
}
