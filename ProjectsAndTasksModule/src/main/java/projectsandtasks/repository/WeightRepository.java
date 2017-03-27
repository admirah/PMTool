package com.projectsandtasks.repository;

/**
 * Created by bake on 3/20/17.
 */

import com.projectsandtasks.models.Weight;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource(collectionResourceRel = "weight", path = "weight")
public interface WeightRepository extends org.springframework.data.jpa.repository.JpaRepository<Weight, Long> {

    List<Weight>  findById(@Param("id") Long id);

}
