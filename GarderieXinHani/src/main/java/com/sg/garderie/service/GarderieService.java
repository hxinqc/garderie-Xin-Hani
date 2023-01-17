package com.sg.garderie.service;

import com.sg.garderie.dao.ActivitiesException;
import com.sg.garderie.dao.FoodsException;
import com.sg.garderie.dao.NewsException;
import com.sg.garderie.model.*;

import java.util.List;
import java.io.IOException;
import java.time.LocalDate;


public interface GarderieService {
    News addNews(News news);
    String saveFile(String fileName, byte[] bytes) throws IOException;
    News getNewsById(int id) throws NewsException;
    List<News> getNewsByDate(LocalDate date);
    List<News> getLatestNews();
    List<News> getAllNews();
    void editNews(News news) throws NewsException;
    void deleteNewsById(int id) throws NewsException;
    Inscription addInscription(Inscription inscription);
    Inscription getInscriptionById(int id);
    List<Inscription> getInscriptionByStatus(INSCRIPTION_STATUS status);
    List<Inscription> getAllInscription();
    void editInscription(Inscription inscription);
    void updateInscriptionStatus(Integer id, String status);

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

    ClassEntity addClass(ClassEntity classEntity);
    ClassEntity getClassById(int id);
    List<ClassEntity> getAllClasses();
    void editClass(ClassEntity classEntity);
    void deleteClassById(int id);

    ChildRoster addChildRoster(ChildRoster childRoster);
    ChildRoster getChildRosterById(int id);
    List<ChildRoster> getChildRosterByClassId(int id);
    List<ChildRoster> getAllChildRosters();
    void editChildRoster(ChildRoster childRoster);
    void deleteChildRosterById(int id);

    Activities addActivities(Activities activities) throws ActivitiesException;
    Activities getActivitiesById(int id) throws ActivitiesException;
    List<Activities> getActivitiesByDate(LocalDate issueDate);
    List<Activities> getAllActivities();
    void editActivities(Activities activities) throws ActivitiesException;
    void deleteActivitiesById(int id) throws ActivitiesException;
    void addClassActivities(int classId, int[] activitiesIds);
    List<ClassActivities> getClassActivitiesByClassId(int classId);
    List<ClassActivities> getAllClassesActivities();
    void deleteClassActivitiesByClassId(int classId);

    Food addFood(Food food);

    List<Food> getAllFoods();

    Food findFoodById(int id);

    List<Food> getAllFoodsByDateClassId(int classId, LocalDate date);

    boolean deleteFoodById(int id) throws FoodsException;

    boolean updateFoodInfo(Food food) throws FoodsException;

    void addClassFoods(int classId, int[] foodsIds);
    List<ClassFood>getClassFoodsByClassId(int classId);
    List<ClassFood>getAllClassesFoods();
    void deleteClassFoodsByClassId(int classId);

    void addClassTeachers(int classId, int[] ids);

    List<Teacher> getClassTeachersByClassId(int classId);

    List<ClassTeacher> getAllClassesTeachers();

    void deleteClassTeachersByClassId(int classId);

}
