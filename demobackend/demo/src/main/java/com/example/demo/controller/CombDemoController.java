package com.example.demo.controller;
import com.example.demo.model.CombDemo;
import com.example.demo.service.CombDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/combdemos")
public class CombDemoController {

    @Autowired
    private CombDemoService combDemoService;

    @GetMapping
    public List<CombDemo> getAllCombDemos() {
        return combDemoService.getAllCombDemos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CombDemo> getCombDemoById(@PathVariable String id) {
        CombDemo combDemo = combDemoService.getCombDemoById(id);
        if (combDemo != null) {
            return ResponseEntity.ok(combDemo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CombDemo> createCombDemo(@RequestBody CombDemo combDemo) {
        CombDemo createdCombDemo = combDemoService.createCombDemo(combDemo);
        return ResponseEntity.ok(createdCombDemo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CombDemo> updateCombDemo(@PathVariable String id, @RequestBody CombDemo combDemo) {
        CombDemo updatedCombDemo = combDemoService.updateCombDemo(id, combDemo);
        if (updatedCombDemo != null) {
            return ResponseEntity.ok(updatedCombDemo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCombDemo(@PathVariable String id) {
        boolean deleted = combDemoService.deleteCombDemo(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
