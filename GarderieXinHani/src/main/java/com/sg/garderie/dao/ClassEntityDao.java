package com.sg.garderie.dao;

import com.sg.garderie.model.ClassEntity;

import java.util.List;

public interface ClassEntityDao {
    ClassEntity addClass(ClassEntity classEntity);
    ClassEntity getClassById(int id);
    List<ClassEntity> getAllClasses();
    void editClass(ClassEntity classEntity);
    void deleteClassById(int id);

}
