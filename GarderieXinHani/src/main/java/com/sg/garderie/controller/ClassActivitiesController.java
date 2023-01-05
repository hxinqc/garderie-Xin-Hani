package com.sg.garderie.controller;

import com.sg.garderie.model.ClassActivities;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
public class ClassActivitiesController {

    @Autowired
    private GarderieService service;
    @PostMapping("/class/activities")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public void addClassActivities(@RequestParam int classId, @RequestParam String activitiesIds) {
        int[] ids = Arrays.stream(activitiesIds.split(",")).mapToInt(id -> Integer.valueOf(id)).toArray() ;

        service.addClassActivities(classId, ids);

    }

    @GetMapping("/class/activities/{classId}")
    @CrossOrigin
    public List<ClassActivities> getClassActivitiesByClassId(@PathVariable int classId) {
        return service.getClassActivitiesByClassId(classId);
    }

    @GetMapping("/class/activities")
    @CrossOrigin
    public List<ClassActivities> getAllClassActivities() {
        return service.getAllClassesActivities();
    }

    @DeleteMapping("/class/activities/{classId}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void deleteClassActivitiesByClassId(@PathVariable int classId) {
        service.deleteClassActivitiesByClassId(classId);
    }
}
