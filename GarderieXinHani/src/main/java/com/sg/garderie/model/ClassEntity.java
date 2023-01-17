package com.sg.garderie.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClassEntity {
    private int id;
    private String name;
    private LocalDate openDate;

}
