package projectsandtasks.repository;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import projectsandtasks.FeignConfiguration;
import projectsandtasks.models.UserModel;
import projectsandtasks.viewmodels.UsersIds;

@FeignClient(name = "users-module", configuration = FeignConfiguration.class)
public interface UsersRepository {
	@RequestMapping("/users")
	public ResponseEntity<List<UserModel>> Get();
	@RequestMapping(value = "/users/all", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserModel>> GetByIds(@RequestBody UsersIds model);
	
}
