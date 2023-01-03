package com.sg.garderie.controller;

import com.sg.garderie.dao.ActivitiesException;
import com.sg.garderie.model.Activities;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class ActivitiesController {

    @Autowired
    private GarderieService service;

    @PostMapping("/activities")
    @ResponseStatus(HttpStatus.CREATED)
    public Activities addActivities(@RequestParam("fileName") MultipartFile multipartFile, HttpServletRequest request)
            throws ActivitiesException, IOException {
        Activities activities = new Activities();
        activities.setName(request.getParameter("name"));
        String issueDate = request.getParameter("activityDate");
        activities.setActivityDate(LocalDate.parse(issueDate, DateTimeFormatter.ISO_LOCAL_DATE));
        activities.setDescription(request.getParameter("description"));
        String fileName = multipartFile.getOriginalFilename();
        byte[] bytes = multipartFile.getBytes();
        String filePath = service.saveFile(fileName, bytes);
        activities.setPicPath(filePath);

        service.addActivities(activities);

        return activities;
    }

    @GetMapping("/activities/{id}")
    public Activities getActivitiesById(@PathVariable int id) throws ActivitiesException{
        return service.getActivitiesById(id);
    }

    @GetMapping("/activities/date/{date}")
    public List<Activities> getActivitiesByDate(@PathVariable LocalDate date) {
        return service.getActivitiesByDate(date);
    }

    @GetMapping("/activities")
    public List<Activities> getAllActivities() {
        return service.getAllActivities();
    }

    @PutMapping("/activities/{id}")
    public Activities editActivitiesById(@PathVariable int id, @RequestParam("fileName") MultipartFile multipartFile,
                             HttpServletRequest request)
            throws IOException, ActivitiesException {
        Activities Activities = new Activities();
        Activities.setId(id);
        Activities.setName(request.getParameter("name"));
        String activityDate = request.getParameter("activityDate");
        Activities.setActivityDate(LocalDate.parse(activityDate, DateTimeFormatter.ISO_LOCAL_DATE));
        Activities.setDescription(request.getParameter("description"));
        String fileName = multipartFile.getOriginalFilename();
        byte[] bytes = multipartFile.getBytes();
        String filePath = service.saveFile(fileName, bytes);
        Activities.setPicPath(filePath);

        service.editActivities(Activities);

        return Activities;
    }

    @DeleteMapping("/activities/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteActivitiesById(@PathVariable int id) throws ActivitiesException {
        service.deleteActivitiesById(id);
    }
}
