package com.sg.garderie.model;

import lombok.Data;

@Data
public class TeacherClassId {
    private int ID;
    private String firstName;
    private String lastName;
    private boolean isActive;
    private Integer classId;

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }

}
