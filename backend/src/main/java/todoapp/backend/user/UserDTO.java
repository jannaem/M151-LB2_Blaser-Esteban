package todoapp.backend.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
  private String firstName;
  private String lastName;
  private String email;
  private String username;
  private String password;

  public UserDTO(String firstName, String lastName, String email, String username, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
  }
}