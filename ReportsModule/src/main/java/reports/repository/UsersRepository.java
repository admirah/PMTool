package reports.repository;

import java.util.List;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import reports.FeignConfiguration;
import reports.models.UserModel;
import reports.models.UsersIds;


@FeignClient(name = "users-module", configuration = FeignConfiguration.class)
public interface UsersRepository {
	
	@RequestMapping("/users")
	public ResponseEntity<List<UserModel>> Get();
	
	@RequestMapping(value = "/users/{id}")
    public ResponseEntity<UserModel> Get(@PathVariable("id") Long id);
	
	@RequestMapping(value = "/users/all", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserModel>> GetByIds(@RequestBody UsersIds model);
	
}
