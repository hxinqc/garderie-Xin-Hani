package com.sg.garderie.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.Objects;

@Data
public class Activities {
    private int id;
    private String name;
    private LocalDate activityDate;
    private String picPath;
    private String description;

}
