package com.example.demo.service;

import com.example.demo.model.CombDemo;

import java.util.List;

public interface CombDemoService {

    List<CombDemo> getAllCombDemos();

    CombDemo getCombDemoById(String id);

    CombDemo createCombDemo(CombDemo combDemo);

    CombDemo updateCombDemo(String id, CombDemo combDemo);

    boolean deleteCombDemo(String id);
}
