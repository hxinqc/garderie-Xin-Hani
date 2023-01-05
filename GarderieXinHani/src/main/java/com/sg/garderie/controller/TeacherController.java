package com.sg.garderie.controller;


import com.sg.garderie.model.Teacher;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class TeacherController {

    @Autowired
    GarderieService service;

    //Retrieving a teacher
    @PostMapping("/teacher")
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin
    public Teacher create(@RequestBody Teacher teacher){
        return service.addTeacher(teacher);
    }


    //Retrieving all teachers
    @GetMapping("/teacher")
    @CrossOrigin
    public List<Teacher> allTeachers() {
        return service.getAllTeachers();
    }


    //Retrieving one teacher by teacherId
    @GetMapping("/teacher/{id}")
    @CrossOrigin
    public ResponseEntity<Teacher> findTeacherById(@PathVariable int id) {
        Teacher result = service.findTeacherById(id);
        if (result == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(result);
    }


    //Updating one teacher
    @PutMapping("/teacher/{id}")
    @CrossOrigin
    public ResponseEntity update(@PathVariable int id, @RequestBody Teacher teacher) {
        ResponseEntity response = new ResponseEntity(HttpStatus.NOT_FOUND);
        if (id != teacher.getID()) {
            response = new ResponseEntity(HttpStatus.UNPROCESSABLE_ENTITY);
        } else if (service.updateTeacherInfo(teacher)) {
            response = new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return response;
    }



    //Deleting one teacher Info
    @DeleteMapping("/teacher/{id}")
    @CrossOrigin
    public ResponseEntity delete(@PathVariable int id) {
        if (service.deleteTeacherById(id)) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }



}
