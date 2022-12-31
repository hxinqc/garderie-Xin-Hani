package com.sg.garderie.controller;

import com.sg.garderie.dao.NewsException;
import com.sg.garderie.model.INSCRIPTION_STATUS;
import com.sg.garderie.model.Inscription;
import com.sg.garderie.model.News;
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
public class InscriptionController {
    @Autowired
    private GarderieService service;

    @PostMapping("/inscription")
    @ResponseStatus(HttpStatus.CREATED)
    public Inscription addInscription(@RequestBody Inscription inscription) {
        return service.addInscription(inscription);
    }

    @GetMapping("/inscription/{id}")
    public Inscription getInscriptionById(@PathVariable int id) {
        return service.getInscriptionById(id);
    }

    @GetMapping("/inscription/status/{status}")
    public List<Inscription> getInscriptionByStatus(@PathVariable INSCRIPTION_STATUS status) {
        return service.getInscriptionByStatus(status);
    }

    @GetMapping("/inscription")
    public List<Inscription> getAllInscription() {
        return service.getAllInscription();
    }

    @PostMapping("/inscription/{id}")
    public void editInscriptionById(@PathVariable int id, @RequestBody Inscription inscription){
        inscription.setId(id);
        service.editInscription(inscription);

    }
}
