package projectsandtasks.models;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created by bake on 3/20/17.
 */
@Entity

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
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "taskStatusId")
    private TaskStatus taskStatus;
    @ManyToOne
    @JoinColumn(name = "weightId")
    private Weight weight;
    private int orderNo;
    private Date startedOn;
    private Date endOn;

    public Task(Task x) {
        this.endOn = x.endOn;
        this.startedOn = x.startedOn;
        this.orderNo = x.orderNo;
        this.weight = x.weight;
        this.owner = x.owner;
        this.finishedOn = x.finishedOn;
        this.createdOn = x.createdOn;
        this.description = x.description;
        this.name = x.name;
        this.id = x.id;
    }

    public TaskStatus getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(TaskStatus taskStatus) {
        this.taskStatus = taskStatus;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Weight getWeight() {
        return weight;
    }

    public void setWeight(Weight weight) {
        this.weight = weight;
    }

    public int getOrder() {
        return orderNo;
    }

    public void setOrder(int order) {
        this.orderNo = order;
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

    public Task(String name, String description, Date createdOn, Date finishedOn, Long owner, Project project, TaskStatus taskStatus, Weight weight, int order, Date startedOn, Date endOn, List<Comment> comments) {
        this.name = name;
        this.description = description;
        this.createdOn = createdOn;
        this.finishedOn = finishedOn;
        this.owner = owner;
        this.project = project;
        this.taskStatus = taskStatus;
        this.weight = weight;
        this.orderNo = order;
        this.startedOn = startedOn;
        this.endOn = endOn;
        this.comments = comments;
    }

    protected Task() {
    }
}
