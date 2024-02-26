package com.nguyenninh.backendecommerce.registration;

import com.nguyenninh.backendecommerce.event.RegistrationCompleteEvent;
import com.nguyenninh.backendecommerce.event.listener.RegistrationCompleteEventListener;
import com.nguyenninh.backendecommerce.registration.password.PasswordResetTokenService;
import com.nguyenninh.backendecommerce.registration.token.VerificationToken;
import com.nguyenninh.backendecommerce.registration.token.VerificationTokenServiceImpl;
import com.nguyenninh.backendecommerce.user.UserService;
import com.nguyenninh.backendecommerce.user.User;
import com.nguyenninh.backendecommerce.utility.UrlUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Controller
@RequiredArgsConstructor
@RequestMapping("/registration")
public class RegistrationController {
    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenServiceImpl tokenService;
    private final PasswordResetTokenService passwordResetTokenService;
    private final RegistrationCompleteEventListener eventListener;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registration, HttpServletRequest request) {
        User user = userService.registerUser(registration);
        publisher.publishEvent(new RegistrationCompleteEvent(user, UrlUtil.getApplicationUrl(request)));
        return ResponseEntity.ok("User registered successfully.");
    }

    @GetMapping("/verifyEmail")
    public ResponseEntity<?> verifyEmail(@RequestBody VerificationTokenRequest token) {
        Optional<VerificationToken> theToken = tokenService.findByToken(token.token());

        if (theToken.isPresent() && theToken.get().getUser().isEnabled())
            return ResponseEntity.ok("Email verified successfully.");

        String verificationResult = tokenService.validateToken(token.token());
        return switch (verificationResult.toLowerCase()) {
            case "expired" -> ResponseEntity.badRequest().body("Token expired.");
            case "valid" -> ResponseEntity.ok("Token validated successfully.");
            default -> ResponseEntity.badRequest().body("Invalid token.");
        };
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> resetPasswordRequest(@RequestBody PasswordForgotTokenRequest request, HttpServletRequest servletRequest) {
        if (request.email() == null || request.email().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }

        try {
            Optional<User> user = userService.findByEmail(request.email());
            if (user.isPresent()) {
                String passwordResetToken = UUID.randomUUID().toString();
                passwordResetTokenService.createPasswordResetTokenForUser(user.get(), passwordResetToken);

                String url = UrlUtil.getApplicationUrl(servletRequest) + "/registration/password-reset-form?token=" + passwordResetToken;
                eventListener.user = user.get();
                eventListener.sendPasswordResetVerificationEmail(url);
                return ResponseEntity.ok("Password reset email sent successfully.");
            } else
                return ResponseEntity.notFound().build();
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending password reset email.");
        }
    }

    public static boolean isValidEmail(String email) {
        final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetTokenRequest request){
        String tokenVerificationResult = passwordResetTokenService.validatePasswordResetToken(request.token());
        System.out.println(tokenVerificationResult);
        if (!tokenVerificationResult.equalsIgnoreCase("valid"))
            return ResponseEntity.badRequest().body("Invalid token.");
        Optional<User> theUser = passwordResetTokenService.findUserByPasswordResetToken(request.token());
        if (theUser.isPresent()) {
            passwordResetTokenService.resetPassword(theUser.get(), request.password());
            return ResponseEntity.ok("Password reset successful.");
        }
        return ResponseEntity.notFound().build();
    }
}
