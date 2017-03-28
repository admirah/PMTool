package projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import org.springframework.data.jpa.repository.Query;
import projectsandtasks.models.Project;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "project", path = "project")

public interface ProjectRepository extends org.springframework.data.jpa.repository.JpaRepository<Project, Long> {
    List<Project> findById(@Param("id") Long id);

}
