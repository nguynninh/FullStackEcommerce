package com.nguyenninh.backendecommerce.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@Slf4j
@Controller
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        Optional<User> user = userService.findById(id);
        return (user.isPresent()) ?
                ResponseEntity.ok(user.get()) :
                ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, User user) {
        boolean updated = userService.updateUser(id, user.getFirstName(), user.getLastName(), user.getEmail());
        return (updated) ?
                ResponseEntity.ok("User updated successfully.") :
                ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        return (userService.deleteUser(id)) ?
                ResponseEntity.ok("User deleted successfully.") :
                ResponseEntity.notFound().build();
    }
}
