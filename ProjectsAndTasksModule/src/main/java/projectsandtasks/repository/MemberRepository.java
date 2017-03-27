package projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import projectsandtasks.models.Member;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "member", path = "member")

public interface MemberRepository extends org.springframework.data.jpa.repository.JpaRepository<Member, Long> {
    List<Member> findById(@Param("id") Long id);


}
