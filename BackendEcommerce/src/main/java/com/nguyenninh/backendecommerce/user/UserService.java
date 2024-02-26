package com.nguyenninh.backendecommerce.user;

import com.nguyenninh.backendecommerce.registration.RegistrationRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    User registerUser(RegistrationRequest registrationRequest);
   Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    boolean updateUser(Long id, String firstName, String lastName, String email);

    boolean deleteUser(Long id);
}
