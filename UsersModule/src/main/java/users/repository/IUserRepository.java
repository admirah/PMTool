package users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import users.database.User;

@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface IUserRepository extends JpaRepository<User, Long> {}
