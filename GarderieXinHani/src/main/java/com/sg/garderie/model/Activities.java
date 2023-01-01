package com.sg.garderie.model;

import java.time.LocalDate;
import java.util.Objects;

public class Activities {
    private int id;
    private String name;
    private LocalDate activityDate;
    private String picPath;
    private String description;

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

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activities that = (Activities) o;
        return id == that.id && Objects.equals(name, that.name) && Objects.equals(activityDate, that.activityDate) && Objects.equals(picPath, that.picPath) && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, activityDate, picPath, description);
    }

    @Override
    public String toString() {
        return "Activities{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", activityDate=" + activityDate +
                ", picPath='" + picPath + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
