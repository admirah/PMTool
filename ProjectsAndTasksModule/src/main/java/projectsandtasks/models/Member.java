package projectsandtasks.models;

import javax.persistence.*;

/**
 * Created by bake on 3/20/17.
 */
@Entity
public class Member {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private Long id;
    private int userId;
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;

    protected Member () {    }

    public Member(int userId, Project project) {
        this.userId = userId;
        this.project = project;
    }
}
