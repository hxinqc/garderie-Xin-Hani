package com.sg.garderie.controller;

import com.sg.garderie.model.ActivitiesClassId;
import com.sg.garderie.model.ClassActivities;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity addClassActivities(@RequestParam int classId, @RequestParam String activitiesIds) {
        int[] ids = null;
        if (activitiesIds != null && !activitiesIds.equals("")) {
            ids = Arrays.stream(activitiesIds.split(",")).mapToInt(id -> Integer.valueOf(id)).toArray();
        }
        service.addClassActivities(classId, ids);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
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

    @GetMapping("/activity/class/{classId}")
    @CrossOrigin
    public List<ActivitiesClassId> getAllClassActivitiesDisplay(@PathVariable int classId) {
        return service.getAllActivitiesClassDisplay(classId);
    }

    @GetMapping("/allActivities/class/{classId}")
    @CrossOrigin
    public List<ActivitiesClassId> getActivitiesForClass(@PathVariable int classId) {
        return service.getActivitiesForClass(classId);
    }

    @DeleteMapping("/class/activities/{classId}")
    @CrossOrigin
    @ResponseStatus(HttpStatus.OK)
    public void deleteClassActivitiesByClassId(@PathVariable int classId) {
        service.deleteClassActivitiesByClassId(classId);
    }
}
