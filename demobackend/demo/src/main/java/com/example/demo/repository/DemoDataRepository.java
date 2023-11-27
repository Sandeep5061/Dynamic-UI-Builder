//package com.example.demo.repository;
//
//
//
//import com.example.demo.model.DemoData;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//public interface DemoDataRepository extends MongoRepository<DemoData, String> {
//}

//package com.example.demo.repository;
//import com.example.demo.model.DemoData;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//public interface DemoDataRepository extends MongoRepository<DemoData, String> {
//    DemoData findByTemplateName(String templateName);
//}
package com.example.demo.repository;

import com.example.demo.model.DemoData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DemoDataRepository extends MongoRepository<DemoData, String> {
    DemoData findByUniqueId(String uniqueId);
}
