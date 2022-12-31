package com.sg.garderie.model;

import java.time.LocalDate;
import java.util.Objects;

public class ClassEntity {
    private int id;
    private String name;
    private LocalDate openDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getOpenDate() {
        return openDate;
    }

    public void setOpenDate(LocalDate openDate) {
        this.openDate = openDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassEntity aClassEntity = (ClassEntity) o;
        return id == aClassEntity.id && Objects.equals(name, aClassEntity.name) && Objects.equals(openDate, aClassEntity.openDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, openDate);
    }

    @Override
    public String toString() {
        return "Class{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", openDate=" + openDate +
                '}';
    }
}
