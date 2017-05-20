package projectsandtasks.models;

/**
 * Created by bake on 5/20/17.
 */

public enum TaskStatusEnum {
    BACKLOG(1),
    SPRINT(2),
    INPROGRESS(3),
    QA(4),
    DONE(5);

    private int _value;

    TaskStatusEnum(int value) {
        this._value = value;
    }

    public int getValue() {
        return _value;
    }
}
