package com.example.demo.controller;

import com.example.demo.model.DemoData;
import com.example.demo.service.DemoDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping("/demo")
//@CrossOrigin("*")
//public class DemoDataController {
//
//    @Autowired
//    private DemoDataService demoDataService;
//
//    @GetMapping("/all")
//    public List<DemoData> getAllDemoData() {
//        return demoDataService.getAllDemoData();
//    }
//
//    @PostMapping("/add")
//    public void addDemoData(@RequestBody DemoData demoData) {
//        demoDataService.saveDemoData(demoData);
//    }
//}

@RestController
@RequestMapping("/demo")
public class DemoDataController {

    @Autowired
    private DemoDataService demoDataService;

    @GetMapping("/all")
    public List<DemoData> getAllDemoData() {
        return demoDataService.getAllDemoData();
    }

    @GetMapping("/{uniqueId}")
    public DemoData getDemoDataByUniqueId(@PathVariable String uniqueId) {
        return demoDataService.getDemoDataByUniqueId(uniqueId);
    }

    @PostMapping("/add")
    public void addDemoData(@RequestBody DemoData demoData) {
        demoDataService.saveDemoData(demoData);
    }

    @PutMapping("/update/{uniqueId}")
    public void updateDemoData(@PathVariable String uniqueId, @RequestBody DemoData demoData) {
        demoDataService.updateDemoData(uniqueId, demoData);
    }

    @DeleteMapping("/delete/{uniqueId}")
    public void deleteDemoData(@PathVariable String uniqueId) {
        System.out.println("Received delete request for uniqueId: " + uniqueId);
        demoDataService.deleteDemoData(uniqueId);
    }
}

//@RestController
//@RequestMapping("/demo")
//public class DemoDataController {
//
//    @Autowired
//    private DemoDataService demoDataService;
//
//    @GetMapping("/all")
//    public List<DemoData> getAllDemoData() {
//        return demoDataService.getAllDemoData();
//    }
//
//    @GetMapping("/{templateName}")
//    public DemoData getDemoDataByTemplateName(@PathVariable String templateName) {
//        return demoDataService.getDemoDataByTemplateName(templateName);
//    }
//
//    @PostMapping("/add")
//    public void addDemoData(@RequestBody DemoData demoData) {
//        demoDataService.saveDemoData(demoData);
//    }
//
//    @PutMapping("/update/{templateName}")
//    public void updateDemoData(@PathVariable String templateName, @RequestBody DemoData demoData) {
//        demoDataService.updateDemoData(templateName, demoData);
//    }
//
//    @DeleteMapping("/delete/{templateName}")
//
//    public void deleteDemoData(@PathVariable String templateName) {
//          System.out.println("Received delete request for templateName: " + templateName);
//        demoDataService.deleteDemoData(templateName);
//    }
//
//}
