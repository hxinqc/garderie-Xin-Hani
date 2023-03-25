package com.sg.garderie.controller;

import com.sg.garderie.dao.FoodsException;
import com.sg.garderie.model.Food;
import com.sg.garderie.model.News;
import com.sg.garderie.service.GarderieService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/")
public class FoodController {

    @Autowired
    GarderieService service;

    //Creating a new food
    @PostMapping("/food")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public Food create(@RequestParam("fileName") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        Food food = new Food();
        food.setName(request.getParameter("name"));
        String offerDate = request.getParameter("offerDate");
        food.setOfferDate(LocalDate.parse(offerDate, DateTimeFormatter.ISO_LOCAL_DATE));
        food.setDescription(request.getParameter("description"));
        String fileName = multipartFile.getOriginalFilename();
        byte[] bytes = multipartFile.getBytes();
        String filePath = service.saveFile(fileName, bytes);
        food.setPicPath(filePath);

        service.addFood(food);

        return food;
    }


    //Retrieving all foods
    @GetMapping("/food")
    @CrossOrigin
    public List<Food> allFoods() {
        return service.getAllFoods();
    }

    //Retrieving one food by foodID
    @GetMapping("/food/{id}")
    @CrossOrigin
    public ResponseEntity<Food> findFoodById(@PathVariable int id) {
        Food result = service.findFoodById(id);
        if (result == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/food/{classId}/{date}")
    @CrossOrigin
    public List<Food> allFoodsByDateClassId(@PathVariable int classId, @PathVariable LocalDate date) {
        return  service.getAllFoodsByDateClassId(classId,date);

    }

    //Updating one food
    @PutMapping("/food/{id}")
    @CrossOrigin
    public ResponseEntity update(@PathVariable int id, @RequestBody Food food) throws FoodsException {
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if (id != food.getID()) {
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
            if (service.updateFoodInfo(food)) {
                response = new ResponseEntity(HttpStatus.NO_CONTENT);
            }
        }
        return response;
    }

    //Deleting one food Info
    @DeleteMapping("/food/{id}")
    @CrossOrigin
    public ResponseEntity delete(@PathVariable int id) throws FoodsException {
        if (service.deleteFoodById(id)) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

}
