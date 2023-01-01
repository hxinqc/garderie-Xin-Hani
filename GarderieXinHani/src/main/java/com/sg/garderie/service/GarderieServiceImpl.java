package com.sg.garderie.service;

import com.sg.garderie.dao.*;
import com.sg.garderie.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
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

    @Value("${file.path}")
    private String FILE_BASE_PATH;

    @Override
    public News addNews(News news) {
        newsDao.addNews(news);
        news.setPicPath("****");
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
    public Admin addAdmin(Admin admin) {
        return adminDao.add(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminDao.getAll();
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
    public ChildRoster addChildRoster(ChildRoster childRoster) {
        return childRosterDao.addChildRoster(childRoster);
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
        activities.setPicPath("****");
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
}
