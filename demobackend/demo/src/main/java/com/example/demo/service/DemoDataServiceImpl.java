package com.example.demo.service;
//
//import com.example.demo.model.DemoData;
//import com.example.demo.repository.DemoDataRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class DemoDataServiceImpl implements DemoDataService {
//
//    @Autowired
//    private DemoDataRepository demoDataRepository;
//
//    @Override
//    public List<DemoData> getAllDemoData() {
//        return demoDataRepository.findAll();
//    }
//
//    @Override
//    public void saveDemoData(DemoData demoData) {
//        demoDataRepository.save(demoData);
////        LOGGER.info("Data saved successfully: " + demoData);
//    }
//}
import com.example.demo.model.DemoData;
import com.example.demo.repository.DemoDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class DemoDataServiceImpl implements DemoDataService {
    private static final Logger logger = LoggerFactory.getLogger(DemoDataServiceImpl.class);

    @Autowired
    private DemoDataRepository demoDataRepository;

    @Override
    public List<DemoData> getAllDemoData() {
        return demoDataRepository.findAll();
    }

    @Override
    public DemoData getDemoDataByUniqueId(String uniqueId) {
        return demoDataRepository.findByUniqueId(uniqueId);
    }

    @Override
    public void saveDemoData(DemoData demoData) {
        demoDataRepository.save(demoData);
    }

    @Override
    public void updateDemoData(String uniqueId, DemoData demoData) {
        DemoData existingData = demoDataRepository.findByUniqueId(uniqueId);
        if (existingData != null) {
            demoData.setUniqueId(uniqueId);
            demoDataRepository.save(demoData);
        }
    }

    @Override
    public void deleteDemoData(String uniqueId) {
        logger.info("Received delete request for uniqueId: " + uniqueId);
        demoDataRepository.deleteById(uniqueId);
    }
}


//import com.example.demo.model.DemoData;
//import com.example.demo.repository.DemoDataRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//@Service
//public class DemoDataServiceImpl implements DemoDataService {
//    private static final Logger logger = LoggerFactory.getLogger(DemoDataServiceImpl.class);
//
//
//    @Autowired
//    private DemoDataRepository demoDataRepository;
//
//    @Override
//    public List<DemoData> getAllDemoData() {
//        return demoDataRepository.findAll();
//    }
//
//    @Override
//    public DemoData getDemoDataByTemplateName(String templateName) {
//        return demoDataRepository.findByTemplateName(templateName);
//    }
//
//    @Override
//    public void saveDemoData(DemoData demoData) {
//        demoDataRepository.save(demoData);
//    }
//
//    @Override
//    public void updateDemoData(String templateName, DemoData demoData) {
//        DemoData existingData = demoDataRepository.findByTemplateName(templateName);
//        if (existingData != null) {
//            demoData.setTemplateName(templateName);
//            demoDataRepository.save(demoData);
//        }
//    }
//
//    @Override
//    public void deleteDemoData(String templateName) {
//        logger.info("dele fount. ", templateName);
//        demoDataRepository.deleteById(templateName);
//    }
//}
