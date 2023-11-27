//package com.example.demo.service;
//
//import com.example.demo.model.DemoData;
//
//import java.util.List;
//
//public interface DemoDataService {
//
//    List<DemoData> getAllDemoData();
//
//    void saveDemoData(DemoData demoData);
//}
//
package com.example.demo.service;

import com.example.demo.model.DemoData;

import java.util.List;

public interface DemoDataService {

    List<DemoData> getAllDemoData();

    DemoData getDemoDataByUniqueId(String uniqueId); // Change method name

    void saveDemoData(DemoData demoData);

    void updateDemoData(String uniqueId, DemoData demoData); // Change method name

    void deleteDemoData(String uniqueId); // Change method name
}

//package com.example.demo.service;
//import com.example.demo.model.DemoData;
//
//import java.util.List;
//
//public interface DemoDataService {
//
//    List<DemoData> getAllDemoData();
//
//    DemoData getDemoDataByTemplateName(String templateName);
//
//    void saveDemoData(DemoData demoData);
//
//    void updateDemoData(String templateName, DemoData demoData);
//
//    void deleteDemoData(String templateName);
//}
