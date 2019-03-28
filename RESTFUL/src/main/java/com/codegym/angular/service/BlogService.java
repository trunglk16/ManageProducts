package com.codegym.angular.service;

import com.codegym.angular.model.Product;

import java.util.List;

public interface BlogService {

    List<Product> findAll();

    Product findById(Long id);

    void save(Product customer);

    void remove(Long id);
}
