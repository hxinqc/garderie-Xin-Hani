package com.sg.garderie.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class Teacher {
    private int ID;
    @NotNull(message = "First Name is mandatory")
    private String firstName;
    @NotNull(message = "Last Name is mandatory")
    private String lastName;
    @NotNull(message = "Teacher status is mandatory")
    private boolean isActive;

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }

}
