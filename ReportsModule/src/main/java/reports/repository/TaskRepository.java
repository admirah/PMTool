package reports.repository;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import reports.FeignConfiguration;
import reports.viewmodels.TaskModel;

import java.util.List;

/**
 * Created by Emina on 14.04.2017..
 */

@FeignClient(name="project-and-tasks-module", configuration=FeignConfiguration.class)
public interface TaskRepository {
    @RequestMapping("/tasks")
    public ResponseEntity<List<TaskModel>> getFinishedTasks();
}