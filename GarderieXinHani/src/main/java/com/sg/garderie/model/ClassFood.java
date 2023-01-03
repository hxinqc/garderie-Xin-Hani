package com.sg.garderie.model;

import java.util.Objects;

public class ClassFood {
    private int classId;
    private int foodId;

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    @Override
    public String toString() {
        return "ClassFood{" +
                "classId=" + classId +
                ", foodId=" + foodId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassFood classFood = (ClassFood) o;
        return classId == classFood.classId && foodId == classFood.foodId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(classId, foodId);
    }
}


