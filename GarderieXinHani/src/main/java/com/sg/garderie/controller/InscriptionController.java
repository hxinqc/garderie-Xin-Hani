package com.sg.garderie.controller;

import com.sg.garderie.model.INSCRIPTION_STATUS;
import com.sg.garderie.model.Inscription;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class InscriptionController {
    @Autowired
    private GarderieService service;

    @PostMapping("/inscription")
    @CrossOrigin
    @ResponseStatus(HttpStatus.CREATED)
    public Inscription addInscription(@RequestBody Inscription inscription) {
        return service.addInscription(inscription);
    }

    @GetMapping("/inscription/{id}")
    @CrossOrigin
    public Inscription getInscriptionById(@PathVariable int id) {
        return service.getInscriptionById(id);
    }

    @GetMapping("/inscription/status/{status}")
    @CrossOrigin
    public List<Inscription> getInscriptionByStatus(@PathVariable INSCRIPTION_STATUS status) {
        return service.getInscriptionByStatus(status);
    }

    @GetMapping("/inscription")
    @CrossOrigin
    public List<Inscription> getAllInscription() {
        return service.getAllInscription();
    }

    @PostMapping("/inscription/{id}")
    @CrossOrigin
    public void editInscriptionById(@PathVariable int id, @RequestBody Inscription inscription){
        inscription.setId(id);
        service.editInscription(inscription);

    }

    @PostMapping("/inscription/{id}/{status}")
    @CrossOrigin
    public void updateInscriptionStatus(@PathVariable int id, @PathVariable String status){
        service.updateInscriptionStatus(id, status);

    }
}
