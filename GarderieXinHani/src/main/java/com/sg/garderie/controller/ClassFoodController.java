package com.sg.garderie.controller;

import com.sg.garderie.model.ActivitiesClassId;
import com.sg.garderie.model.ClassFood;
import com.sg.garderie.model.FoodsClassId;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
public class ClassFoodController {

    @Autowired
    private GarderieService service;

     @PostMapping("/class/foods")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity addClassFoods(@RequestParam int classId, @RequestParam String foodsIds) {
        int[] ids = null;
        if (foodsIds != null && !foodsIds.equals("")) {
            ids = Arrays.stream(foodsIds.split(",")).mapToInt(id -> Integer.valueOf(id)).toArray();
        }
        service.addClassFoods(classId, ids);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/allFoods/class/{classId}")
    @CrossOrigin
    public List<FoodsClassId> getFoodsForClass(@PathVariable int classId) {
        return service.getFoodsForClass(classId);
    }


    @GetMapping("/class/foods/{classId}")
    @CrossOrigin
    public List<ClassFood> getClassFoodsByClassId(@PathVariable int classId) {
        return service.getClassFoodsByClassId(classId);
    }

    @GetMapping("/class/foods")
    @CrossOrigin
    public List<ClassFood> getAllClassFoods() {
        return service.getAllClassesFoods();
    }

    @DeleteMapping("/class/foods/{classId}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void deleteClassFoodsByClassId(@PathVariable int classId) {
        service.deleteClassFoodsByClassId(classId);
    }


}
