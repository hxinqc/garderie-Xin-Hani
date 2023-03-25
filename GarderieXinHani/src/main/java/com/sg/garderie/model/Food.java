package com.sg.garderie.model;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
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
