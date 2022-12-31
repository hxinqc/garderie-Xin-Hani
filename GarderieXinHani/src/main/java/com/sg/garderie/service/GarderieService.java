package com.sg.garderie.service;

import com.sg.garderie.dao.NewsException;
import com.sg.garderie.model.INSCRIPTION_STATUS;
import com.sg.garderie.model.Inscription;
import com.sg.garderie.model.News;
import com.sg.garderie.model.Admin;
import com.sg.garderie.model.Teacher;

import java.util.List;
import java.io.IOException;
import java.time.LocalDate;


public interface GarderieService {
    News addNews(News news);
    String saveFile(String fileName, byte[] bytes) throws IOException;
    News getNewsById(int id) throws NewsException;
    List<News> getNewsByDate(LocalDate date);
    List<News> getAllNews();
    void editNews(News news) throws NewsException;
    void deleteNewsById(int id) throws NewsException;
    Inscription addInscription(Inscription inscription);
    Inscription getInscriptionById(int id);
    List<Inscription> getInscriptionByStatus(INSCRIPTION_STATUS status);
    List<Inscription> getAllInscription();
    void editInscription(Inscription inscription);

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
