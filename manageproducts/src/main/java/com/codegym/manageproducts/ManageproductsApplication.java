package com.codegym.manageproducts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ManageproductsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManageproductsApplication.class, args);
    }

}
