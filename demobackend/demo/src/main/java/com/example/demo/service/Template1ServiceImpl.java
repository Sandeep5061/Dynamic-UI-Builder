package com.example.demo.service;

import com.example.demo.model.Template1;
import com.example.demo.repository.Template1Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Template1ServiceImpl implements Template1Service {



        @Autowired
        private Template1Repository template1Repository;

        @Override
        public List<Template1> getAllTemplates() {
            return template1Repository.findAll();
        }

        @Override
        public Template1 getTemplateById(String id) {
            return template1Repository.findById(id).orElse(null);
        }

        @Override
        public Template1 saveTemplate(Template1 template) {
            return template1Repository.save(template);
        }

        @Override
        public void deleteTemplate(String id) {
            template1Repository.deleteById(id);
        }
    }