package com.codegym.manageproducts.Controller;

import com.codegym.manageproducts.Model.Product;
import com.codegym.manageproducts.Repository.ProductRepository;
import com.codegym.manageproducts.ResourceNotFoundException.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public Page<Product> getProduct(@RequestParam(defaultValue = "0") int page) {
        return productRepository.findAll(new PageRequest(page, 4));
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(value = "id") Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        productRepository.delete(product);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable(value = "id") Long productId, @RequestBody Product productDetail) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));
        product.setId(productDetail.getId());
        product.setDescriptions(productDetail.getDescriptions());
        product.setName(productDetail.getDescriptions());
        product.setType(productDetail.getType());
        Product updateProduct = productRepository.save(product);
        return updateProduct;
    }

}
