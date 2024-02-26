package com.nguyenninh.backendecommerce.registration;

    public record PasswordForgotTokenRequest(
            String email,
            String token
    ) {
    }
