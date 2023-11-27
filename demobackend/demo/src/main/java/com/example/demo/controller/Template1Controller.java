package com.example.demo.controller;
import com.example.demo.exception.TemplateNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Template1; // Import your Template1 model class
import com.example.demo.service.Template1Service; // Import your Template1Service interface

@RestController
@RequestMapping("/templates")
public class Template1Controller {

    @Autowired
    private Template1Service template1Service;

    @GetMapping
    public List<Template1> getAllTemplates() {
        return template1Service.getAllTemplates();
    }

    @GetMapping("/{id}")
    public Template1 getTemplateById(@PathVariable String id) {
        return template1Service.getTemplateById(id);
    }

    @PostMapping
    public Template1 saveTemplate(@RequestBody Template1 template) {
        return template1Service.saveTemplate(template);
    }

    @DeleteMapping("/{id}")
    public void deleteTemplate(@PathVariable String id) {
        template1Service.deleteTemplate(id);
    }
    @PutMapping("/{id}")
    public Template1 updateTemplate(@PathVariable String id, @RequestBody Template1 updatedTemplate) {
        Optional<Template1> existingTemplateOptional = Optional.ofNullable(template1Service.getTemplateById(id));

        if (existingTemplateOptional.isPresent()) {
            Template1 existingTemplate = existingTemplateOptional.get();

            // Find the UserData object that needs to be updated by matching its ID
            for (Template1.UserData existingUserData : existingTemplate.getData()) {
                for (Template1.UserData updatedUserData : updatedTemplate.getData()) {
                    if (existingUserData.getId().equals(updatedUserData.getId())) {
                        // Update specific fields of the existing UserData
                        existingUserData.setLabel(updatedUserData.getLabel());
                        existingUserData.setValue(updatedUserData.getValue());
                        // Continue updating other fields as needed
                    }
                }
            }

            return template1Service.saveTemplate(existingTemplate);
        } else {
            throw new TemplateNotFoundException("Template with id " + id + " not found");
        }
    }

}