package projectsandtasks.viewmodels;

import java.util.ArrayList;

/**
 * Created by Vejsil on 15.04.2017..
 */
public class FinishedTaskGroupedTotal {
    private int totalWeight;
    private ArrayList<FinishedTaskGrouped> finishedTaskGrouped;

    public FinishedTaskGroupedTotal(ArrayList<FinishedTaskGrouped> finishedTaskGrouped, int totalWeight) {
        this.totalWeight = totalWeight;
        this.finishedTaskGrouped = finishedTaskGrouped;
    }

    public int getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(int totalWeight) {
        this.totalWeight = totalWeight;
    }

    public ArrayList<FinishedTaskGrouped> getFinishedTaskGrouped() {
        return finishedTaskGrouped;
    }

    public void setFinishedTaskGrouped(ArrayList<FinishedTaskGrouped> finishedTaskGrouped) {
        this.finishedTaskGrouped = finishedTaskGrouped;
    }
}
