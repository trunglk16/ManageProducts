package com.codegym.manageproducts.Repository;

import com.codegym.manageproducts.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
