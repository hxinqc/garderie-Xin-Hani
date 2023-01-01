package com.sg.garderie.model;

import java.util.Objects;

public class ClassActivities {
    private int classId;
    private int activityId;

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public int getActivityId() {
        return activityId;
    }

    public void setActivityId(int activityId) {
        this.activityId = activityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassActivities that = (ClassActivities) o;
        return classId == that.classId && activityId == that.activityId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(classId, activityId);
    }

    @Override
    public String toString() {
        return "ClassActivities{" +
                "classId=" + classId +
                ", activityId=" + activityId +
                '}';
    }
}
