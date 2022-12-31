package com.sg.garderie.controller;

import com.sg.garderie.model.Admin;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@RestController
@RequestMapping("/")
public class AdminController {

    @Autowired
    GarderieService service;

    //Creating a new admin
    @PostMapping("/admin")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin create(@RequestBody Admin admin){
        return service.addAdmin(admin);
    }


    //Retrieving all admins
    @GetMapping("/admin")
    public List<Admin> allAdmins() {
        return service.getAllAdmins();
    }

    //Retrieving one admin by adminID
    @GetMapping("/admin/{id}")
    public ResponseEntity<Admin> findAdminById(@PathVariable int id) {
        Admin result = service.findAdminById(id);
        if (result == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }

    //Updating one admin
    @PutMapping("/admin/{id}")
    public ResponseEntity update(@PathVariable int id, @RequestBody Admin admin) {
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if (id != admin.getID()) {
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else if (service.updateAdminInfo(admin)) {
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }



    //Deleting one admin Info
    @DeleteMapping("/admin/{id}")
    public ResponseEntity delete(@PathVariable int id) {
        if (service.deleteAdminById(id)) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }



}
