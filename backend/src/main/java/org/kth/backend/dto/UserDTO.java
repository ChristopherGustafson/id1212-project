package org.kth.backend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

@Validated
public class UserDTO {
    @Email(message = "Email must be valid")
    public String email;

    @NotNull(message = "Password cannot be null")
    @Size(min = 6, message = "Password need to be at least 6 characters")
    public String password;
}
