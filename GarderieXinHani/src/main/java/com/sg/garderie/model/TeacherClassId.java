package com.sg.garderie.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TeacherClassId {
    private int id;
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

    public TeacherClassId(Teacher teacher) {
        this.id = teacher.getID();
        this.firstName = teacher.getFirstName();
        this.lastName = teacher.getLastName();
        this.isActive = teacher.getIsActive();
    }

}
