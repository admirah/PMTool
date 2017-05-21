package projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import projectsandtasks.models.Project;
import projectsandtasks.models.Task;
import projectsandtasks.viewmodels.FinishedTask;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "task", path = "task")

public interface TaskRepository extends org.springframework.data.jpa.repository.JpaRepository<Task, Long> {
    Task findById(@Param("id") Long id);

    @Query("select distinct i from Task i where i.project=:project and i.taskStatus=1")
    List<Task> getBacklogByProject(@Param("project") Project project);
    @Query("select distinct i from Task i where i.project=:project and i.taskStatus=2")
    List<Task> getSprintByProject(@Param("project") Project project);
    @Query("select distinct i from Task i where i.project=:project and i.taskStatus=3")
    List<Task> getInProgressByProject(@Param("project") Project project);
    @Query("select distinct i from Task i where i.project=:project and i.taskStatus=4")
    List<Task> getQAByProject(@Param("project") Project project);
 /*   @Query("select distinct i from Task i where i.project=:project and i.taskStatus=5")
    List<Task> getDoneByProject(@Param("project") Project project);*/
}
