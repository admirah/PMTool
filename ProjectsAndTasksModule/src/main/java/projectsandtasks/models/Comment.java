package com.projectsandtasks.models;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by bake on 3/20/17.
 */
@Entity
public class Comment {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdOn;
    private Long user;
    @ManyToOne
    @JoinColumn(name = "taskId")
    private Task task;


    public Comment(String content, Date createdOn, Long user, Task task) {
        this.content = content;
        this.createdOn = createdOn;
        this.user = user;
        this.task = task;
    }

    protected Comment() {
    }
}
