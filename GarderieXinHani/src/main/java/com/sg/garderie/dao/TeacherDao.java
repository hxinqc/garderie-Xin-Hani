package com.sg.garderie.dao;

import com.sg.garderie.model.Teacher;

import java.util.List;

public interface TeacherDao {

    Teacher add(Teacher teacher);

    List<com.sg.garderie.model.Teacher> getAll();

    Teacher findTeacherById(int id);

    boolean deleteTeacherById(int id);

    boolean updateTeacherInfo(Teacher teacher);
}
