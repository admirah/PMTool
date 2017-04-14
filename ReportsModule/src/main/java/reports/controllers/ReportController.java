package reports.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import reports.models.Report;
import reports.models.ReportDao;
import reports.models.ResponseModel;
import reports.repository.TaskRepository;
import reports.viewmodels.TaskModel;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Emina on 21.03.2017..
 */
@Controller
public class ReportController {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private ReportDao reportDao;

    public ResponseEntity<List<reports.viewmodels.TaskModel>> tasksById(int id){
        List<TaskModel> tasks =(List<TaskModel>) repository.getFinishedTasks();
        ArrayList<TaskModel> taskoviZaUsera = new ArrayList<>();
        for (TaskModel task: tasks)
            if (task.getUserId()==id)
            {
                taskoviZaUsera.add(task);
            }
            return new ResponseEntity<List<TaskModel>>(taskoviZaUsera,HttpStatus.OK);

    }
    public ResponseEntity<List<reports.viewmodels.TaskModel>> tasksByDateAndMembers(int id, Date date){
        List<TaskModel> tasks =(List<TaskModel>) repository.getFinishedTasks();
        ArrayList<TaskModel> taskoviZaUsera = new ArrayList<>();
        for (TaskModel task: tasks)
            if (task.getUserId()==id && task.getFinishedOn()==date)
            {
                taskoviZaUsera.add(task);
            }
        return new ResponseEntity<List<TaskModel>>(taskoviZaUsera,HttpStatus.OK);

    }
    public ResponseEntity<List<reports.viewmodels.TaskModel>> tasksByDateWeight(int weight, Date date){
        List<TaskModel> tasks =(List<TaskModel>) repository.getFinishedTasks();
        ArrayList<TaskModel> taskovi = new ArrayList<>();

        for (TaskModel task: tasks)
            if (task.getWeightValue()==weight && task.getFinishedOn()==date)
            {
                taskovi.add(task);
            }
        return new ResponseEntity<List<TaskModel>>(taskovi,HttpStatus.OK);

    }


    @RequestMapping(value = "", method = RequestMethod.PATCH, produces = "application/json")
    public ResponseEntity<Report> create(@RequestBody Report report){
        String reportId="";
        try{
            reportDao.save(report);
            reportId=String.valueOf(report.getId());
        }
        catch(Exception e){
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Report>(report, HttpStatus.OK);

    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(long id) {
    try{
        Report report = new Report(id);
        reportDao.delete(report);
    }
    catch (Exception ex){
        return "Error deleting the report: " + ex.toString();
    }
    return "Report succesfully deleted!";
}


    @RequestMapping("/get-by-name")
    @ResponseBody
    public String getByName(String name) {
        String reportId="";
        try {
            List<Report>reports = reportDao.findByName(name);
            Report report=reports.get(0);
            reportId=String.valueOf(report.getId());
        }
        catch (Exception ex) {
            return "Report not found: "+ex;
        }
        return "The report id is: "+reportId;
    }


    @RequestMapping(value = "", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<Report> updateReport(@RequestBody Report report) {
        try {

            reportDao.save(report);
        }
        catch (Exception e) {
            return new ResponseEntity(new ResponseModel(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Report>(report,HttpStatus.OK);
    }


}

