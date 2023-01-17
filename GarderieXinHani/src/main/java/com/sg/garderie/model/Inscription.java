package com.sg.garderie.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Inscription {
    private int id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate inscriptionDate;
    private int openPlace;
    private INSCRIPTION_STATUS status;

}
