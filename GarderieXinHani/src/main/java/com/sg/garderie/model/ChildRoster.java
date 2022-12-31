package com.sg.garderie.model;

import java.util.Objects;

public class ChildRoster {
    private int id;
    private int classId;
    private String firstName;
    private String lastName;
    private int inscriptionId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getInscriptionId() {
        return inscriptionId;
    }

    public void setInscriptionId(int inscriptionId) {
        this.inscriptionId = inscriptionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChildRoster that = (ChildRoster) o;
        return id == that.id && classId == that.classId && inscriptionId == that.inscriptionId && Objects.equals(firstName, that.firstName) && Objects.equals(lastName, that.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, classId, firstName, lastName, inscriptionId);
    }

    @Override
    public String toString() {
        return "ClassRoster{" +
                "id=" + id +
                ", classId=" + classId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", inscriptionId=" + inscriptionId +
                '}';
    }
}
