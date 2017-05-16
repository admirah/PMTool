package projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import org.springframework.data.jpa.repository.Query;
import projectsandtasks.models.*;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "project", path = "project")

public interface ProjectRepository extends org.springframework.data.jpa.repository.JpaRepository<Project, Long> {
    Project findById(@Param("id") Long id);


    @Query("select distinct i from Project i where i.owner=:userid")
    List<Project> getByUser(@Param("userid") int userid);



}
