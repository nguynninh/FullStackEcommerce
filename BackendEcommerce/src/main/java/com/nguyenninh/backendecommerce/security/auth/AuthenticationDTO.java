package com.nguyenninh.backendecommerce.security.auth;

import lombok.Data;

@Data
public class AuthenticationDTO {
    private String email;
    private String password;
}
