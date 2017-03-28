package projectsandtasks;


import projectsandtasks.models.Weight;

import projectsandtasks.repository.WeightRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }

    @Bean
    public CommandLineRunner demo(WeightRepository repository) {
        return (args) -> {
            // save a couple of customers
            repository.save(new Weight("Tezina jedan", 1));
            repository.save(new Weight("Tezina 2", 2));

            // fetch all customers

            for (Weight customer : repository.findAll()) {
            }


            // fetch an individual customer by ID
            Weight customer = repository.findOne(1L);



        };
    }
}




@RefreshScope
@RestController
class MessageRestController {
    @Value("${password}")
    private String password;
    @RequestMapping("/pass")
    String getPass() {
        return this.password;
    }


    @Value("${message:Hello default}")
    private String message;

    @RequestMapping("/message")
    String getMessage() {
        return this.message;
    }
}
