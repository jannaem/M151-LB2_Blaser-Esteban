package todoapp.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import todoapp.backend.role.Role;
import todoapp.backend.user.UserDTO;
import todoapp.backend.user.UserService;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

	}
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(1, "ROLE_USER"));
			userService.saveRole(new Role(2, "ROLE_ADMIN"));
			userService.saveUser(new UserDTO("Milena", "Blaser", "blaser@gmail.com", "mblaser", "blaser123"));
			userService.saveUser(new UserDTO("Janna", "Esteban", "esteban@gmail.com", "jesteban", "esteban123"));
		};
	}
}
