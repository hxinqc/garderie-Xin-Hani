package com.sg.garderie.model;

import lombok.Data;

@Data
public class Teacher {
    private int ID;
    private String firstName;
    private String lastName;
    private boolean isActive;

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }

}
