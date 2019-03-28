package com.codegym.angular.controller;

import com.codegym.angular.model.Product;
import com.codegym.angular.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class BlogController {

    @Autowired
    private BlogService blogService;

    //-------------------Retrieve All Blogs--------------------------------------------------------

    @RequestMapping(value = "/getall/", method = RequestMethod.GET)
    public ResponseEntity<List<Product>> listAllBlogs() {
        List<Product> getall = blogService.findAll();
        if (getall.isEmpty()) {
            return new ResponseEntity<List<Product>>(HttpStatus.NO_CONTENT);//You many decide to return HttpStatus.NOT_FOUND
        }
        return new ResponseEntity<List<Product>>(getall, HttpStatus.OK);
    }

    //-------------------Retrieve Single Product--------------------------------------------------------

    @RequestMapping(value = "/getall/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Product> getBlog(@PathVariable("id") long id) {
        System.out.println("Fetching Product with id " + id);
        Product product = blogService.findById(id);
        if (product == null) {
            System.out.println("Product with id " + id + " not found");
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

    //-------------------Create a Product--------------------------------------------------------

    @RequestMapping(value = "/getall/", method = RequestMethod.POST)
    public ResponseEntity<Void> createBlog(@RequestBody Product product, UriComponentsBuilder ucBuilder) {
        System.out.println("Creating Product " + product.getTitle());
        blogService.save(product);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/getall/{id}").buildAndExpand(product.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    //------------------- Update a Product --------------------------------------------------------

    @RequestMapping(value = "/getall/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Product> updateBlog(@PathVariable("id") long id, @RequestBody Product product) {
        System.out.println("Updating Product " + id);

        Product currentProduct = blogService.findById(id);

        if (currentProduct == null) {
            System.out.println("Product with id " + id + " not found");
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }

        currentProduct.setUserId(product.getUserId());
        currentProduct.setBody(product.getBody());
        currentProduct.setId(product.getId());
        currentProduct.setTitle(product.getTitle());

        blogService.save(currentProduct);
        return new ResponseEntity<Product>(currentProduct, HttpStatus.OK);
    }

    //------------------- Delete a Product --------------------------------------------------------

    @RequestMapping(value = "/getall/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Product> deleteBlog(@PathVariable("id") long id) {
        System.out.println("Fetching & Deleting Product with id " + id);

        Product product = blogService.findById(id);
        if (product == null) {
            System.out.println("Unable to delete. Product with id " + id + " not found");
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }

        blogService.remove(id);
        return new ResponseEntity<Product>(HttpStatus.NO_CONTENT);
    }
}