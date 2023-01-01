package com.sg.garderie.controller;

import com.sg.garderie.model.Food;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/")
public class FoodController {

    @Autowired
    GarderieService service;

    //Creating a new food
    @PostMapping("/food")
    @ResponseStatus(HttpStatus.CREATED)
    public Food create(@RequestBody Food food){
        return service.addFood(food);
    }


    //Retrieving all foods
    @GetMapping("/food")
    public List<Food> allFoods() {
        return service.getAllFoods();
    }

    //Retrieving one food by foodID
    @GetMapping("/food/{id}")
    public ResponseEntity<Food> findFoodById(@PathVariable int id) {
        Food result = service.findFoodById(id);
        if (result == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }

    //  Retrieving foods by classID and date
    @GetMapping("/food/{id}")
    public List<Food> allFoodsByDateClassId(@PathVariable int id, @PathVariable LocalDate date) {
       return  service.getAllFoodsByDateClassId(id,date);

    }


    //Updating one food
    @PutMapping("/food/{id}")
    public ResponseEntity update(@PathVariable int id, @RequestBody Food food) {
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if (id != food.getID()) {
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else if (service.updateFoodInfo(food)) {
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }



    //Deleting one food Info
    @DeleteMapping("/food/{id}")
    public ResponseEntity delete(@PathVariable int id) {
        if (service.deleteFoodById(id)) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

}
