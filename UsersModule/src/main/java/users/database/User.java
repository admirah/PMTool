package users.database;

import org.hibernate.annotations.Where;
import users.database.*;
import javax.persistence.*;


/**
 * Created by abasic on 20.03.2017..
 */
@Entity
@Table(name = "users")
@Where(clause="deleted=0")
public class User extends Base{

    public User() {super();}

    public User(String image) {
        this.image = image;
    }

    public User(String email, String name, String bio, String imagem, String username){
        super();
        this.email = email;
        this.name = name;
        this.bio = bio;
        this.image = image;
        this.username=username;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    @Column(unique=true)
    private String email;
    private String username;
    private String password;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String bio;
    private String image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
