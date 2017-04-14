package projectsandtasks.repository;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import projectsandtasks.FeignConfiguration;
import projectsandtasks.models.UserModel;
import projectsandtasks.viewmodels.UsersIds;

@FeignClient(name = "users-module", configuration = FeignConfiguration.class)
public interface UsersRepository {
	@RequestMapping("/users")
	public ResponseEntity<List<UserModel>> Get();
	@RequestMapping("/all")
	public ResponseEntity<List<UserModel>> GetByIds(UsersIds model);
	
}
