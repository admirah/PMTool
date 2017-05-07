package users.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import users.database.AuthToken;

public interface IAuthTokenRepository extends JpaRepository<AuthToken, Long> {}
