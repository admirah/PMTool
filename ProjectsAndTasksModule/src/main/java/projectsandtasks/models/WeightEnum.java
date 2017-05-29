package projectsandtasks.models;

public enum WeightEnum {
	LOW(1),
	MEDIUM(3),
	HIGH(5);
	
	private int _value;
	
	WeightEnum(int value) {
        this._value = value;
    }

    public int getValue() {
        return _value;
    }
}
