package com.sg.garderie.controller;

import com.sg.garderie.model.ClassTeacher;
import com.sg.garderie.model.Teacher;
import com.sg.garderie.model.TeacherClassId;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
public class ClassTeacherController {

    @Autowired
    private GarderieService service;

    @PostMapping("/class/teachers")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity addClassTeachers(@RequestParam String classId, @RequestParam String teachersIds) {
        int[] ids = null;
        if (teachersIds != null && !teachersIds.equals("")) {
            ids = Arrays.stream(teachersIds.split(",")).mapToInt(id -> Integer.valueOf(id)).toArray();
        }
        int id = Integer.valueOf(classId);
        service.addClassTeachers(id, ids);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/class/teachers/{classId}")
    @CrossOrigin
    public List<Teacher> getClassTeachersByClassId(@PathVariable int classId) {
        return service.getClassTeachersByClassId(classId);
    }

    @GetMapping("/class/teachers")
    @CrossOrigin
    public List<ClassTeacher> getAllClassTeachers() {
        return service.getAllClassesTeachers();
    }

    @GetMapping("/teachers/class/{classId}")
    @CrossOrigin
    public List<TeacherClassId> getAllClassTeachersDisplay(@PathVariable int classId) {
        return service.getAllClassesTeachersDisplay(classId);
    }

    @DeleteMapping("/class/teachers/{classId}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void deleteClassTeachersByClassId(@PathVariable int classId) {
        service.deleteClassTeachersByClassId(classId);
    }
}
