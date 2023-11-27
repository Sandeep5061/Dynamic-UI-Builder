package com.example.demo.repository;

import com.example.demo.model.Template1;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface Template1Repository extends MongoRepository<Template1, String> {
//    Optional<Template1> findById(String id); // Change method to use 'id' property
}