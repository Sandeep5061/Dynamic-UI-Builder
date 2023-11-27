package com.example.demo.service;

import com.example.demo.model.Template1;

import java.util.List;
import java.util.Optional;

public interface Template1Service {


    List<Template1> getAllTemplates();

    Template1 getTemplateById(String id);

    Template1 saveTemplate(Template1 template);

    void deleteTemplate(String id);

}