package com.codegym.manageproducts.Controller;

import com.codegym.manageproducts.Model.Product;
import com.codegym.manageproducts.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public Page<Product> getProduct(@RequestParam(defaultValue = "0") int page) {
        return productRepository.findAll(new PageRequest(page, 4));
    }


}
