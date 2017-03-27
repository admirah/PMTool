package projectsandtasks.models;

import javax.persistence.*;
import java.util.List;

/**
 * Created by bake on 3/20/17.
 */
@Entity
public class Weight {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String name;
    private int value;

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @OneToMany(mappedBy="weight")
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

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Weight(String name, int value) {
        this.name = name;
        this.value = value;
        this.tasks = tasks;
    }

    protected Weight() {
    }
}
