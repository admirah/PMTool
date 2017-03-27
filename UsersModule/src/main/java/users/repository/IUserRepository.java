package users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import users.database.User;


public interface IUserRepository extends JpaRepository<User, Long> {}
