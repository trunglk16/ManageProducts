package com.codegym.angular.service.impl;

import com.codegym.angular.model.Product;
import com.codegym.angular.repository.BlogRepository;
import com.codegym.angular.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<Product> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public Product findById(Long id) {
        return blogRepository.findById(id);
    }

    @Override
    public void save(Product product) {
        blogRepository.save(product);
    }

    @Override
    public void remove(Long id) {
        blogRepository.remove(id);
    }
}
