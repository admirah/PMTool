package users;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class ApplicationContextProvider implements ApplicationContextAware {
	
	
	 /**
     * 
     */
    private ApplicationContext context;

    /**
     * @return
     */
    public static ApplicationContext getApplicationContext() {
        final ApplicationContextProvider cprovider = new ApplicationContextProvider();
        return cprovider.getContext();
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;
    }

    /**
     * @return the context
     */
    ApplicationContext getContext() {
        return context;
    }  


}
