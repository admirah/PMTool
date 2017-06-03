package projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import projectsandtasks.models.Comment;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "comment", path = "comment")

public interface CommentRepository extends org.springframework.data.jpa.repository.JpaRepository<Comment, Long> {
    List<Comment> findById(@Param("id") Long id);



}
