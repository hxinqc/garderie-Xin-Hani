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
        return path.toString();
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
}
