package com.sg.garderie.controller;

import com.sg.garderie.model.ChildRoster;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChildRosterController {

    @Autowired
    private GarderieService service;

    @PostMapping("/roster")
    @ResponseStatus(HttpStatus.CREATED)
    public ChildRoster addRoster(@RequestBody ChildRoster childRoster) {
        service.addChildRoster(childRoster);

        return childRoster;
    }

    @GetMapping("/roster/{id}")
    public ChildRoster getRosterById(@PathVariable int id){
        return service.getChildRosterById(id);
    }

    @GetMapping("/roster/class/{id}")
    public ChildRoster getRosterByClassId(@PathVariable int id){
        return service.getChildRosterByClassId(id);
    }

    @GetMapping("/roster")
    public List<ChildRoster> getAllRosters() {
        return service.getAllChildRosters();
    }

    @PutMapping("/roster/{id}")
    public ChildRoster editRosterById(@PathVariable int id, @RequestBody ChildRoster childRoster) {
        childRoster.setId(id);
        service.editChildRoster(childRoster);
        return childRoster;
    }

    @DeleteMapping("/roster/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteRosterById(@PathVariable int id) {
        service.deleteChildRosterById(id);
    }
}
