package com.sg.garderie.service;

import com.sg.garderie.dao.*;
import com.sg.garderie.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class GarderieServiceImpl implements GarderieService {

    @Autowired
    NewsDao newsDao;

    @Autowired
    InscriptionDao inscriptionDao;

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private ClassEntityDao classEntityDao;

    @Autowired
    private ChildRosterDao childRosterDao;

    @Autowired

    private ActivitiesDao activitiesDao;

    @Autowired
    private ClassActivitiesDao classActivitiesDao;

    @Autowired
    private FoodDao foodDao;

    @Autowired
    private ClassFoodsDao  classFoodsDao;

    @Autowired
    private ClassTeachersDao  classTeachersDao;

    @Value("${file.path}")
    private String FILE_BASE_PATH;
    private final int NEWS_COUNT = 5;

    @Override
    public News addNews(News news) {
        newsDao.addNews(news);
        String fileName = news.getPicPath().replaceFirst(FILE_BASE_PATH, "");
        news.setPicPath("/download/" + fileName);
        return news;
    }

    @Override
    public String saveFile(String fileName, byte[] bytes) throws IOException {
        String fileType = fileName.substring(fileName.lastIndexOf("."));
        UUID uuid = UUID.randomUUID();
        Path path = Paths.get(FILE_BASE_PATH + uuid + fileType);
        Files.write(path, bytes);
        String filePath = path.toString();
        filePath = filePath.replaceAll("\\\\", "/");
        return filePath;
    }

    @Override
    public News getNewsById(int id) throws NewsException {
        News news = newsDao.getNewsById(id);
        if (news == null) throw new NewsException("No such news.");
        String fileName = news.getPicPath().replaceFirst(FILE_BASE_PATH, "");
        news.setPicPath("/download/" + fileName);
        return news;
    }

    @Override
    public List<News> getNewsByDate(LocalDate date) {
        List<News> list = newsDao.getNewsByDate(date);
        list.stream().forEach(news -> news.setPicPath("/download/" +
                news.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public List<News> getLatestNews() {
        List<News> list = newsDao.getLatestNews(NEWS_COUNT);
        list.stream().forEach(news -> news.setPicPath("/download/" +
                news.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public List<News> getAllNews() {
        List<News> list = newsDao.getAllNews();
        list.stream().forEach(news -> news.setPicPath("/download/" +
                news.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public void editNews(News news) throws NewsException {
        News retrieveNews = getNewsById(news.getId());
        File file = new File(retrieveNews.getPicPath());
        if (file.exists()) {
            file.delete();
        }
        newsDao.editNews(news);
    }

    @Override
    public void deleteNewsById(int id) throws NewsException {
        News retrieveNews = getNewsById(id);
        if (retrieveNews == null) throw new NewsException("No such news.");
        File file = new File(retrieveNews.getPicPath());
        if (file.exists()) {
            file.delete();
        }
        newsDao.deleteNewsById(id);
    }

    @Override
    public Inscription addInscription(Inscription inscription) {
        inscription.setStatus(INSCRIPTION_STATUS.INITIATE);
        return inscriptionDao.addInscription(inscription);
    }

    @Override
    public Inscription getInscriptionById(int id) {
        return inscriptionDao.getInscriptionById(id);
    }

    @Override
    public List<Inscription> getInscriptionByStatus(INSCRIPTION_STATUS status) {
        return inscriptionDao.getInscriptionByStatus(status);
    }

    @Override
    public List<Inscription> getAllInscription() {
        return inscriptionDao.getAllInscription();
    }

    @Override
    public void editInscription(Inscription inscription) {
        inscriptionDao.editInscription(inscription);
    }

    @Override
    public void updateInscriptionStatus(Integer id, INSCRIPTION_STATUS status) {
        inscriptionDao.updateStatus(id, status);
    }

    @Override
    public Admin addAdmin(Admin admin) {
        return adminDao.add(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminDao.getAllAdmin();
    }

    @Override
    public Admin findAdminById(int id) {
        return adminDao.findAdminById(id);
    }

    @Override
    public boolean deleteAdminById(int id) {
        return adminDao.deleteAdminById(id);

    }

    @Override
    public boolean updateAdminInfo(Admin admin) {
        return adminDao.updateAdminInfo(admin);
    }

    //Teacher Business Logic
    @Override
    public Teacher addTeacher(Teacher teacher) {
        return teacherDao.add(teacher);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherDao.getAll();
    }

    @Override
    public Teacher findTeacherById(int id) {
        return teacherDao.findTeacherById(id);
    }

    @Override
    public boolean deleteTeacherById(int id) {
        return teacherDao.deleteTeacherById(id);
    }

    @Override
    public boolean updateTeacherInfo(Teacher teacher) {
        return teacherDao.updateTeacherInfo(teacher);
    }

    @Override
    public ClassEntity addClass(ClassEntity classEntity) {
        return classEntityDao.addClass(classEntity);
    }

    @Override
    public ClassEntity getClassById(int id) {
        return classEntityDao.getClassById(id);
    }

    @Override
    public List<ClassEntity> getAllClasses() {
        return classEntityDao.getAllClasses();
    }

    @Override
    public void editClass(ClassEntity classEntity) {
        classEntityDao.editClass(classEntity);
    }

    @Override
    public void deleteClassById(int id) {
        classEntityDao.deleteClassById(id);
    }

    @Override
    @Transactional
    public ChildRoster addChildRoster(ChildRoster childRoster) {
        ChildRoster childRoster1;
        childRoster1 = childRosterDao.addChildRoster(childRoster);
        if (childRoster.getInscriptionId() != null) {
            inscriptionDao.updateStatus(childRoster.getInscriptionId(), INSCRIPTION_STATUS.ACCEPTED);
        }
        return childRoster1;
    }

    @Override
    public ChildRoster getChildRosterById(int id) {
        return childRosterDao.getChildRosterById(id);
    }

    @Override
    public List<ChildRoster> getChildRosterByClassId(int id) {
        return childRosterDao.getChildRostersByClassId(id);
    }

    @Override
    public List<ChildRoster> getAllChildRosters() {
        return childRosterDao.getAllChildRosters();
    }

    @Override
    public void editChildRoster(ChildRoster childRoster) {
        childRosterDao.editChildRoster(childRoster);
    }

    @Override
    public void deleteChildRosterById(int id) {
        childRosterDao.deleteChildRosterById(id);
    }


    @Override
    public Activities addActivities(Activities activities) throws ActivitiesException {
        activitiesDao.addActivities(activities);
        String fileName = activities.getPicPath().replaceFirst(FILE_BASE_PATH, "");
        activities.setPicPath("/download/" + fileName);
        return activities;
    }

    @Override
    public Activities getActivitiesById(int id) throws ActivitiesException {
        Activities activities = activitiesDao.getActivitiesById(id);
        if (activities == null) throw new ActivitiesException("No such activities.");
        String fileName = activities.getPicPath().replaceFirst(FILE_BASE_PATH, "");
        activities.setPicPath("/download/" + fileName);
        return activities;
    }

    @Override
    public List<Activities> getActivitiesByDate(LocalDate issueDate) {
        List<Activities> list = activitiesDao.getActivitiesByDate(issueDate);
        list.stream().forEach(activities -> activities.setPicPath("/download/" +
                activities.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public List<Activities> getAllActivities() {
        List<Activities> list = activitiesDao.getAllActivities();
        list.stream().forEach(activities -> activities.setPicPath("/download/" +
                activities.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public List<ActivitiesClassId> getAllActivitiesClassDisplay(int classId) {
        List<ActivitiesClassId> list = classActivitiesDao.getAllActivitiesClassDisplay(classId);
        if (list != null)
            list.stream().forEach(activities -> activities.setPicPath("/download/" +
                    activities.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public List<ActivitiesClassId> getActivitiesForClass(int classId) {
        List<ClassActivities> classActivities = classActivitiesDao.getClassActivitiesByClassId(classId);

        List<Activities> list = activitiesDao.getAllActivities();
        ActivitiesClassId activitiesClassId;
        List<ActivitiesClassId> returnList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            activitiesClassId = new ActivitiesClassId(list.get(i));
            activitiesClassId.setPicPath("/download/" +
                    activitiesClassId.getPicPath().replaceFirst(FILE_BASE_PATH, ""));
            if (classActivities != null && classActivities.contains(new ClassActivities(classId, activitiesClassId.getId())))
                activitiesClassId.setClassId(classId);
            returnList.add(activitiesClassId);

        }
        return returnList;
    }

    @Override
    public void editActivities(Activities activities) throws ActivitiesException {
        Activities retrieveActivities = getActivitiesById(activities.getId());
        File file = new File(retrieveActivities.getPicPath());
        if (file.exists()) {
            file.delete();
        }
        activitiesDao.editActivities(activities);
    }

    @Override
    public void deleteActivitiesById(int id) throws ActivitiesException {
        Activities retrieveActivities = getActivitiesById(id);
        File file = new File(retrieveActivities.getPicPath());
        if (file.exists()) {
            file.delete();
        }
        activitiesDao.deleteActivitiesById(id);
    }

    @Override
    public void addClassActivities(int classId, int[] activitiesIds) {
        classActivitiesDao.addClassActivities(classId, activitiesIds);
    }

    @Override
    public List<ClassActivities> getClassActivitiesByClassId(int classId) {
        return classActivitiesDao.getClassActivitiesByClassId(classId);
    }

    @Override
    public List<ClassActivities> getAllClassesActivities() {
        return classActivitiesDao.getAllClassesActivities();
    }

    @Override
    public void deleteClassActivitiesByClassId(int classId) {
        classActivitiesDao.deleteClassActivitiesByClassId(classId);
    }

    // business logic for food
    @Override
    public Food addFood(Food food) {
        foodDao.add(food);
        String fileName = food.getPicPath().replaceFirst(FILE_BASE_PATH, "");
        food.setPicPath("/download/" + fileName);
        return food;
    }

    @Override
    public List<Food> getAllFoods() {
        List<Food> list = foodDao.getAllFood();
        list.stream().forEach(food -> food.setPicPath("/download/" +
                food.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public Food findFoodById(int id) {
        Food food = foodDao.findFoodById(id);
        food.setPicPath("/download/" + food.getPicPath().replaceFirst(FILE_BASE_PATH, ""));
        return food;
    }


    @Override
    public List<Food> getAllFoodsByDateClassId(int classId, LocalDate date){
        return foodDao.getAllFoodsByDateClassId(classId,date);
    }

    @Override
    public boolean deleteFoodById (int id) throws FoodsException{

            Food retrieveFood = findFoodById(id);
            if (retrieveFood == null) throw new FoodsException("No such Food.");
            File file = new File(retrieveFood.getPicPath());
            if (file.exists()) {
                file.delete();
            }
        return foodDao.deleteFoodById(id);
    }

    public boolean updateFoodInfo(Food food) throws FoodsException{
        Food retrieveFood = findFoodById(food.getID());
        File file = new File(retrieveFood.getPicPath());
            if (file.exists()) {
                file.delete();
            }
        return foodDao.updateFoodInfo(food);

        }

    @Override
    public void addClassFoods(int classId, int[] foodsIds) {
         classFoodsDao.addClassFoods(classId,foodsIds);
    }

    @Override
    public List<ClassFood> getClassFoodsByClassId(int classId) {
        return classFoodsDao.getClassFoodsByClassId(classId);
    }

    @Override
    public List<ClassFood> getAllClassesFoods() {
        return classFoodsDao.getAllClassesFoods();
    }

    @Override
    public void deleteClassFoodsByClassId(int classId) {
        classFoodsDao.deleteClassFoodsByClassId(classId);

    }



    @Override
    public List<FoodsClassId> getAllFoodsClassDisplay(int classId) {
        List<FoodsClassId> list = classFoodsDao.getAllFoodsClassDisplay(classId);
        if (list != null)
            list.stream().forEach(foods -> foods.setPicPath("/download/" +
                    foods.getPicPath().replaceFirst(FILE_BASE_PATH, "")));
        return list;
    }

    @Override
    public List<FoodsClassId> getFoodsForClass(int classId) {
        List<ClassFood> classFoods = classFoodsDao.getClassFoodsByClassId(classId);

        List<Food> list = foodDao.getAllFood();
        FoodsClassId foodsClassId;
        List<FoodsClassId> returnList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            foodsClassId = new FoodsClassId(list.get(i));
            foodsClassId.setPicPath("/download/" +
                    foodsClassId.getPicPath().replaceFirst(FILE_BASE_PATH, ""));
            if (classFoods != null && classFoods.contains(new ClassActivities(classId, foodsClassId.getId())))
                foodsClassId.setClassId(classId);
            returnList.add(foodsClassId);

        }
        return returnList;
    }


    @Override
    public void addClassTeachers(int classId, int[] ids) {
        classTeachersDao.addClassTeachers(classId,ids);
    }

    @Override
    public List<Teacher> getClassTeachersByClassId(int classId) {
        return classTeachersDao.getClassTeachersByClassId(classId);
    }

    @Override
    public List<ClassTeacher> getAllClassesTeachers() {
        return classTeachersDao.getAllClassesTeachers();
    }

    @Override
    public List<TeacherClassId> getAllClassesTeachersDisplay(int classId) {

        return classTeachersDao.getAllClassesTeachersDisplay(classId);
    }

    @Override
    public List<TeacherClassId> getTeachersForClass(int classId) {
        List<ClassTeacher> classTeachers = classTeachersDao.getAllClassesTeachersByClassId(classId);

        List<Teacher> list = teacherDao.getAll();
        TeacherClassId teacherClassId;
        List<TeacherClassId> returnList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            teacherClassId = new TeacherClassId(list.get(i));
            if (classTeachers != null && classTeachers.contains(new ClassTeacher(classId, teacherClassId.getId())))
                teacherClassId.setClassId(classId);
            returnList.add(teacherClassId);

        }
        return returnList;
    }

    @Override
    public void deleteClassTeachersByClassId(int classId) {
        classTeachersDao.deleteClassTeachersByClassId(classId);
    }

}
