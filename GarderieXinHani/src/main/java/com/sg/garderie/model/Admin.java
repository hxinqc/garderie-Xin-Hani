package com.sg.garderie.model;

import java.util.Objects;

public class Admin {

    private int ID;
    private String name;
    private String password;
    private String description;
    private boolean isActive;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "ID=" + ID +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", description='" + description + '\'' +
                ", isActive=" + isActive +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return ID == admin.ID && isActive == admin.isActive && Objects.equals(name, admin.name) && Objects.equals(password, admin.password) && Objects.equals(description, admin.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, name, password, description, isActive);
    }
}