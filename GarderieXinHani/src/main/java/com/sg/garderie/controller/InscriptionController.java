package com.sg.garderie.controller;

import com.sg.garderie.model.Inscription;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class InscriptionController {
    @Autowired
    private GarderieService service;

    @PostMapping("/inscription")
    @ResponseStatus(HttpStatus.CREATED)
    public Inscription addInscription(@RequestBody Inscription inscription) {
        return service.addInscription(inscription);
    }
}
