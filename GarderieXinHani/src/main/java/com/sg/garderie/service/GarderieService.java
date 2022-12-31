package com.sg.garderie.service;

import com.sg.garderie.model.Admin;
import com.sg.garderie.model.Teacher;

import java.util.List;

public interface GarderieService {
    Admin addAdmin(Admin admin);

    List<Admin> getAllAdmins();

    Admin findAdminById(int id);

    boolean deleteAdminById(int id);

    boolean updateAdminInfo(Admin admin);


    // Teacher business logic
    Teacher addTeacher(Teacher teacher);

    List<Teacher> getAllTeachers();

    Teacher findTeacherById(int id);

    boolean deleteTeacherById(int id);

    boolean updateTeacherInfo(Teacher teacher);


}
