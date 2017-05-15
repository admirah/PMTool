package projectsandtasks.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by bake on 3/20/17.
 */
@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Project {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
    @Temporal(TemporalType.TIMESTAMP)
    private Date finishedOn;
    @Column(columnDefinition = "TEXT")
    private String description;
    private int owner;
    @Temporal(TemporalType.TIMESTAMP)
    private Date startedOn;
    @Temporal(TemporalType.TIMESTAMP)
    private Date endOn;
    @OneToMany(mappedBy="project")
    private List<Member> projects;
  @OneToMany(mappedBy="project")
    private List<TaskStatus> taskStatuses;

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

    public List<Member> getProjects() {
        return projects;
    }

    public void setProjects(List<Member> projects) {
        this.projects = projects;
    }

    public List<TaskStatus> getTaskStatuses() {
        return taskStatuses;
    }

    public void setTaskStatuses(List<TaskStatus> taskStatuses) {
        this.taskStatuses = taskStatuses;
    }

    protected Project () {    }

    public Project(String name, Date createdOn, Date finishedOn, String description, int owner, Date startedOn, Date endOn, List<Member> projects, List<TaskStatus> taskStatuses) {
        this.name = name;
        this.createdOn = createdOn;
        this.finishedOn = finishedOn;
        this.description = description;
        this.owner = owner;
        this.startedOn = startedOn;
        this.endOn = endOn;
        this.projects = projects;
        this.taskStatuses = taskStatuses;
    }

}
