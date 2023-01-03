package com.sg.garderie.model;

import java.time.LocalDate;
import java.util.Objects;

public class Food {
    private int ID;
    private String name;
    private LocalDate offerDate;
    private String description;
    private String picPath;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getOfferDate() {
        return offerDate;
    }

    public void setOfferDate(LocalDate offerDate) {
        this.offerDate = offerDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Override
    public String toString() {
        return "Food{" +
                "ID=" + ID +
                ", name='" + name + '\'' +
                ", offerDate=" + offerDate +
                ", description='" + description + '\'' +
                ", picPath='" + picPath + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Food food = (Food) o;
        return ID == food.ID && Objects.equals(name, food.name) && Objects.equals(offerDate, food.offerDate) && Objects.equals(description, food.description) && Objects.equals(picPath, food.picPath);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, name, offerDate, description, picPath);
    }
}
