package com.sg.garderie.model;

import java.util.Objects;

public class ClassTeacher {
    private int classId;
    private int teacherId;

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public int getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(int teacherId) {
        this.teacherId = teacherId;
    }

    @Override
    public String toString() {
        return "ClassTeacher{" +
                "classId=" + classId +
                ", teacherId=" + teacherId +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassTeacher that = (ClassTeacher) o;
        return classId == that.classId && teacherId == that.teacherId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(classId, teacherId);
    }
}
