package com.nguyenninh.backendecommerce.registration;

public record PasswordResetTokenRequest
        (String token,
         String password){

}
