package com.example.demo.repository;

import com.example.demo.model.CombDemo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CombDemoRepository extends MongoRepository<CombDemo, String> {

}
