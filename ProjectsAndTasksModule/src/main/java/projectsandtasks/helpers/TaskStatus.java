package projectsandtasks.helpers;

public enum TaskStatus {
    BACKLOG(1),
    SPRINT(2),
    INPROGRESS(3),
    QA(4),
    DONE(5);

    private int _value;

    TaskStatus(int value) {
        this._value = value;
    }

    public int getValue() {
        return _value;
    }
}