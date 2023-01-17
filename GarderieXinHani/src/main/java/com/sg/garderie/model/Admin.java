package com.sg.garderie.model;

import lombok.Data;

import java.util.Objects;

@Data
public class Admin {

    private int ID;
    private String name;
    private String password;
    private String description;
    private boolean isActive;

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }
}