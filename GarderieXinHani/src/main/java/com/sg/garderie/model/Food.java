package com.sg.garderie.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class Food {
    private int ID;
    @NotNull(message = "Food Name is mandatory")
    private String name;
    @NotNull(message = "Offering Date is mandatory")
    private LocalDate offerDate;
    private String description;
    @NotBlank(message = "Offering Date is mandatory")
    private String picPath;

}
