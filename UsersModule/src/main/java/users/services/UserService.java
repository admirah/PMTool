package users.services;

import users.database.User;
import users.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by abasic on 20.03.2017..
 */
@Component
public class UserService {
    @Autowired
    private IUserRepository repository;

    @Transactional
    public void Insert(User user){
        repository.save(user);
    }

    @Transactional(readOnly=true)
    public List<User> Get() {
        return repository.findAll();
    }

    @Transactional
    public User Get(Long id){
        return (User) repository.findOne(id);
    }

    @Transactional
    public void Update(User user, Long id){
        User oldEntity = Get(id);
        oldEntity.setEmail(user.getEmail());
        oldEntity.setBio(user.getBio());
        oldEntity.setImage(user.getImage());
        oldEntity.setName(user.getName());
    }

    @Transactional
    public void Delete(Long id) throws Exception {
        User user = Get(id);
        if(user == null) throw new Exception("User not found");
        user.setDeleted(true);
    }

}
