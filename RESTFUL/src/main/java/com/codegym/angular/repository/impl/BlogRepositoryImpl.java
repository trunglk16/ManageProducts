package com.codegym.angular.repository.impl;

import com.codegym.angular.model.Product;
import com.codegym.angular.repository.BlogRepository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class BlogRepositoryImpl implements BlogRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Product> findAll() {
        TypedQuery<Product> query = em.createQuery("select c from Blog c", Product.class);
        return query.getResultList();
    }

    @Override
    public Product findById(Long id) {
        TypedQuery<Product> query = em.createQuery("select c from Blog c where  c.id=:id", Product.class);
        query.setParameter("id", id);
        try {
            return query.getSingleResult();
        }catch (NoResultException e){
            return null;
        }
    }

    @Override
    public void save(Product model) {
        if(model.getId() != null){
            em.merge(model);
        } else {
            em.persist(model);
        }
    }

    @Override
    public void remove(Long id) {
        Product customer = findById(id);
        if(customer != null){
            em.remove(customer);
        }
    }
}
