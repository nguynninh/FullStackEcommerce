package com.nguyenninh.backendecommerce.home;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class HomeController {
    @GetMapping("/")
    public String homePage(){
        return "Trang chu";
    }
//    @GetMapping("/login")
//    public String login(){
//        return "login";
//    }
//    @GetMapping("/error")
//    public String error(){
//        return "error";
//    }

}