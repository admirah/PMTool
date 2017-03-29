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

import java.util.List;

/**
 * Created by Emina on 21.03.2017..
 */
@Controller
public class ReportController {

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

    @Autowired
    private ReportDao reportDao;
}

