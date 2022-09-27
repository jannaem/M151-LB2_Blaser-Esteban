package todoapp.backend.user;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import todoapp.backend.role.Role;

import java.util.List;

@Controller
@RequestMapping
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getUsers() {
    return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
  }

  @GetMapping("/user/{username}")
  public ResponseEntity<UserDTO> getUser(@PathVariable String username) {
    return new ResponseEntity<>(userService.getUserDTO(username), HttpStatus.OK);
  }

  @PostMapping("/role")
  public ResponseEntity<Role> saveRole(@RequestBody Role role) {
    return new ResponseEntity<>(userService.saveRole(role), HttpStatus.CREATED);
  }
}
