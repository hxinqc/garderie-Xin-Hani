package com.sg.garderie.dao;

import com.sg.garderie.model.ActivitiesClassId;
import com.sg.garderie.model.ClassActivities;

import java.util.List;

public interface ClassActivitiesDao {
    void addClassActivities(int classId, int[] ids);
    List<ClassActivities> getClassActivitiesByClassId(int classId);
    List<ClassActivities> getAllClassesActivities();
    List<ActivitiesClassId> getAllActivitiesClassDisplay(int classId);
    void deleteClassActivitiesByClassId(int classId);

}
