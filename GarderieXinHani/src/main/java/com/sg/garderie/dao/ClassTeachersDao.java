package com.sg.garderie.dao;

import com.sg.garderie.model.ClassTeacher;
import com.sg.garderie.model.Teacher;
import com.sg.garderie.model.TeacherClassId;

import java.util.List;

public interface ClassTeachersDao {

    List<Teacher> getClassTeachersByClassId(int classId);

    List<ClassTeacher> getAllClassesTeachers();
    List<ClassTeacher> getAllClassesTeachersByClassId(int classId);
    List<TeacherClassId> getAllClassesTeachersDisplay(int classId);
    List<TeacherClassId> getTeachersForClass(int classId);

    void deleteClassTeachersByClassId(int classId);

    void addClassTeachers(int classId, int[] ids);
}
