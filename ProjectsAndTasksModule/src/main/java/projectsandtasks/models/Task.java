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
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
    @Temporal(TemporalType.TIMESTAMP)
    private Date finishedOn;
    private Long owner;

    @Enumerated(EnumType.ORDINAL)
    private TaskStatusEnum taskStatus;
    
    @Enumerated(EnumType.ORDINAL)
    private WeightEnum weight;

    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;
    
    private Date startedOn;
    private Date endOn;

    public Task(Task x) {
        this.endOn = x.endOn;
        this.startedOn = x.startedOn;
        this.weight = x.weight;
        this.owner = x.owner;
        this.finishedOn = x.finishedOn;
        this.createdOn = x.createdOn;
        this.description = x.description;
        this.name = x.name;
        this.id = x.id;
        this.project = x.project;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    @OneToMany(mappedBy="task")
    private List<Comment> comments;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Long getOwner() {
        return owner;
    }

    public void setOwner(Long owner) {
        this.owner = owner;
    }

    public WeightEnum getWeight() {
        return weight;
    }

    public void setWeight(WeightEnum weight) {
        this.weight = weight;
    }

    public TaskStatusEnum getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatusEnum taskStatus) {
        this.taskStatus = taskStatus;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }


    //treba nam i ovaj konstruktor, ne  brisati!
    public Task(String name, String description, Date createdOn, Date finishedOn, Long owner,  WeightEnum weight, Date startedOn, Date endOn, List<Comment> comments, Project project) {
        this.name = name;
        this.description = description;
        this.createdOn = createdOn;
        this.finishedOn = finishedOn;
        this.owner = owner;
        this.weight = weight;
        this.startedOn = startedOn;
        this.endOn = endOn;
        this.comments = comments;
        this.project = project;
    }

    public Task() {
    }
}
