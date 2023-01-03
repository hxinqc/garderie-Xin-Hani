package com.sg.garderie.dao;

import com.sg.garderie.model.ClassTeacher;

import java.util.List;

public interface ClassTeachersDao {

    List<ClassTeacher> getClassTeachersByClassId(int classId);

    List<ClassTeacher> getAllClassesTeachers();

    void deleteClassTeachersByClassId(int classId);

    void addClassTeachers(int classId, int[] ids);
}
