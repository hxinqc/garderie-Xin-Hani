package com.sg.garderie.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor

public class FoodsClassId {

    private int id;
    private String name;
    private LocalDate offerDate;
    private String picPath;
    private String description;
    private Integer classId;

    public FoodsClassId(Food foods) {
        this.id = foods.getID();
        this.name = foods.getName();
        this.offerDate = foods.getOfferDate();
        this.picPath = foods.getPicPath();
        this.description = foods.getDescription();
    }

}
