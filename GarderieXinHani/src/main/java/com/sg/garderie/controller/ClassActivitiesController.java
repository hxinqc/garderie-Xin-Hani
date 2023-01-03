package com.sg.garderie.controller;

import com.sg.garderie.model.ClassActivities;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@RestController
public class ClassActivitiesController {

    @Autowired
    private GarderieService service;
    @PostMapping("/class/activities")
    @ResponseStatus(HttpStatus.CREATED)
    public void addClassActivities(@RequestParam int classId, @RequestParam String activitiesIds) {
        int[] ids = Arrays.stream(activitiesIds.split(",")).mapToInt(id -> Integer.valueOf(id)).toArray() ;

        service.addClassActivities(classId, ids);

    }

    @GetMapping("/class/activities/{classId}")
    public List<ClassActivities> getClassActivitiesByClassId(@PathVariable int classId) {
        return service.getClassActivitiesByClassId(classId);
    }

    @GetMapping("/class/activities")
    public List<ClassActivities> getAllClassActivities() {
        return service.getAllClassesActivities();
    }

    @DeleteMapping("/class/activities/{classId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteClassActivitiesByClassId(@PathVariable int classId) {
        service.deleteClassActivitiesByClassId(classId);
    }
}
