package com.pmtool.models;


import javax.persistence.*;
import java.util.Date;

import javax.validation.constraints.NotNull;
/**
 * Created by Emina on 21.03.2017..
 */
@Entity
@Table(name="report")
public class Report {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;

    @NotNull
    private String name;

    @NotNull
    private long CreatedBy;

    @NotNull
    private long Project;

    @NotNull
    private Date CreatedOn;

    public Report(){}
    public Report (long id) {
        this.id=id;
        this.setCreatedOn(new Date());
    }
    public Report(String name, Date CreatedOn) {
        this.name=name;
        this.CreatedOn=CreatedOn;
    }

    public Report(String name) {
        this.name=name;
        this.CreatedOn=new Date();
    }


    public long getId() {
        return id;
    }

    public void setId(long value) {
        this.id = value;
    }

    public long getCreatedBy() {
        return CreatedBy;
    }

    public void setCreatedBy(long value) {
        this.CreatedBy = value;
    }

    public long getProject() {
        return Project;
    }

    public void setProject(long value) {
        this.Project = value;
    }

    public Date getCreatedOn() {
        return this.CreatedOn;
    }

    public void setCreatedOn(Date value) {
        this.CreatedOn = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String value) {
        this.name = value;
    }

}
