package reports.viewmodels;

import java.util.ArrayList;

/**
 * Created by Emina on 16.04.2017..
 */
public class FinishedTaskGroupedTotal {
    private int totalWeight;
    private ArrayList<FinishedTaskGrouped> finishedTaskGrouped;

    public FinishedTaskGroupedTotal(){}
    public FinishedTaskGroupedTotal(ArrayList<FinishedTaskGrouped> finishedTaskGrouped, int totalWeight) {
        this.totalWeight = totalWeight;
        this.finishedTaskGrouped = finishedTaskGrouped;
    }
    public FinishedTaskGroupedTotal( int totalWeight,ArrayList<FinishedTaskGrouped> finishedTaskGrouped) {
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

