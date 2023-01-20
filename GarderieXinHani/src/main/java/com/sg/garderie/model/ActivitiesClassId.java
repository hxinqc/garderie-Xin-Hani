package com.sg.garderie.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ActivitiesClassId {
    private int id;
    private String name;
    private LocalDate activityDate;
    private String picPath;
    private String description;
    private Integer classId;

    public ActivitiesClassId(Activities activities) {
        this.id = activities.getId();
        this.name = activities.getName();
        this.activityDate = activities.getActivityDate();
        this.picPath = activities.getPicPath();
        this.description = activities.getDescription();
    }
}
