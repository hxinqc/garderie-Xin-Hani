package com.sg.garderie.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Food {
    private int ID;
    private String name;
    private LocalDate offerDate;
    private String description;
    private String picPath;

}
