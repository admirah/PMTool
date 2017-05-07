package users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import users.database.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {}
