package users.database;

import javax.persistence.MappedSuperclass;

/**
 * Created by abasic on 21.03.2017..
 */
@MappedSuperclass
public abstract class Base {

    public Base(){
        deleted = false;
    }

    protected boolean deleted;

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
