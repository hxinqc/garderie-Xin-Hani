package com.sg.garderie.controller;

import com.sg.garderie.model.ClassEntity;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ClassController {

    @Autowired
    private GarderieService service;
    @PostMapping("/class")
    @ResponseStatus(HttpStatus.CREATED)
    public ClassEntity addClass(@RequestBody ClassEntity classEntity)  {
        service.addClass(classEntity);

        return classEntity;
    }

    @GetMapping("/class/{id}")
    public ClassEntity getClassById(@PathVariable int id) {
        return service.getClassById(id);
    }

    @GetMapping("/classes")
    public List<ClassEntity> getAllClasses() {
        return service.getAllClasses();
    }

    @PutMapping("/class/{id}")
    public ClassEntity editClassById(@PathVariable int id, @RequestBody ClassEntity classEntity) {
        classEntity.setId(id);
        service.editClass(classEntity);
        return classEntity;
    }

    @DeleteMapping("/class/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteClassById(@PathVariable int id) {
        service.deleteClassById(id);
    }
}
