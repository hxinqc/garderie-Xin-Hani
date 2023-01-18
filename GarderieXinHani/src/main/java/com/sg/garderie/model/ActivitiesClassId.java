package com.sg.garderie.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ActivitiesClassId {
    private int id;
    private String name;
    private LocalDate activityDate;
    private String picPath;
    private String description;
    private Integer classId;

}
