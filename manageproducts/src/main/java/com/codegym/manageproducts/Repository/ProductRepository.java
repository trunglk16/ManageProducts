package com.codegym.manageproducts.Repository;

import com.codegym.manageproducts.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface ProductRepository extends JpaRepository<Product, Long> {
}
