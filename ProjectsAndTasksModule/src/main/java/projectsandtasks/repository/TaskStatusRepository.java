package projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import projectsandtasks.models.TaskStatus;


import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "taskstatus", path = "taskstatus")
public interface TaskStatusRepository extends org.springframework.data.jpa.repository.JpaRepository<TaskStatus, Long> {

    List<TaskStatus> findById(@Param("id") Long id);

}
