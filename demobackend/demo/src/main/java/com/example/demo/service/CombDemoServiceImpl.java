package com.example.demo.service;

import com.example.demo.model.CombDemo;
import com.example.demo.repository.CombDemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CombDemoServiceImpl implements CombDemoService {

    @Autowired
    private CombDemoRepository combDemoRepository;

    @Override
    public List<CombDemo> getAllCombDemos() {
        return combDemoRepository.findAll();
    }

    @Override
    public CombDemo getCombDemoById(String id) {
        return combDemoRepository.findById(id).orElse(null);
    }

    @Override
    public CombDemo createCombDemo(CombDemo combDemo) {
        return combDemoRepository.save(combDemo);
    }

    @Override
    public CombDemo updateCombDemo(String id, CombDemo combDemo) {
        CombDemo existingCombDemo = combDemoRepository.findById(id).orElse(null);
        if (existingCombDemo != null) {
            // Update fields of existingCombDemo with corresponding fields from combDemo
            existingCombDemo.setCommonName(combDemo.getCommonName());
            existingCombDemo.setTemplates(combDemo.getTemplates());
            return combDemoRepository.save(existingCombDemo);
        }
        return null;
    }

    @Override
    public boolean deleteCombDemo(String id) {
        CombDemo existingCombDemo = combDemoRepository.findById(id).orElse(null);
        if (existingCombDemo != null) {
            combDemoRepository.delete(existingCombDemo);
            return true;
        }
        return false;
    }
}
