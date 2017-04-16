package reports.repository;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import reports.FeignConfiguration;
import reports.viewmodels.TaskModel;

import java.util.List;

/**
 * Created by Emina on 14.04.2017..
 */

@FeignClient(name="pt-module", configuration=FeignConfiguration.class)
public interface TaskRepository {
    @RequestMapping("/tasks")
    public ResponseEntity<List<TaskModel>> getFinishedTasks();
    @RequestMapping(value = "/task/numberoftasks", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String>  finishedTasksGroupedBy(@RequestParam(value = "projectId") Long projectId, @RequestParam(value="userId") Long userId);
}