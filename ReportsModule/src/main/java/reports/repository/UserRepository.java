package reports.repository;


import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import reports.FeignConfiguration;
import reports.viewmodels.UserModel;

import java.util.List;


/**
 * Created by Emina on 14.04.2017..
 */
@FeignClient(name="users-module", configuration=FeignConfiguration.class)
public interface UserRepository {
    @RequestMapping("/user")
    public ResponseEntity<List<UserModel>> Get();

}
