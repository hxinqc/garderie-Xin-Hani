package com.sg.garderie.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Data
public class Admin {

    private int ID;
    @NotNull(message = "Name is mandatory")
    private String name;
    @NotNull(message = "Password is mandatory")
    private String password;
    private String description;
    @NotNull(message = "Admin status is mandatory")
    private boolean isActive;

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }
}