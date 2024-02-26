package com.nguyenninh.backendecommerce.user;

import com.nguyenninh.backendecommerce.registration.RegistrationRequest;
import com.nguyenninh.backendecommerce.registration.token.VerificationTokenService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final VerificationTokenService verificationTokenService;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User registerUser(RegistrationRequest registration) {
        var user = new User(registration.getFirstName(),
                registration.getLastName(),
                registration.getEmail(),
                passwordEncoder.encode(registration.getPassword()),
                List.of(new Role("ROLE_USER")));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found")));
    }

    public Optional<User> email(String email) {
        return findByEmail(email);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    @Override
    public boolean updateUser(Long id, String firstName, String lastName, String email) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.update(firstName, lastName, email, id);
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public boolean deleteUser(Long id) {
        Optional<User> theUser = userRepository.findById(id);
        if (theUser.isPresent()) {
            theUser.ifPresent(user -> verificationTokenService.deleteUserToken(user.getId()));
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
