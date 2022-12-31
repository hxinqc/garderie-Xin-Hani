package com.sg.garderie.service;

import com.sg.garderie.dao.AdminDao;
import com.sg.garderie.dao.TeacherDao;
import com.sg.garderie.model.Admin;
import com.sg.garderie.model.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarderieServiceImpl implements GarderieService {

   @Autowired
   private AdminDao adminDao;

   @Autowired
   private TeacherDao teacherDao;


   @Autowired
   public GarderieServiceImpl(AdminDao adminDao , TeacherDao teacherDao){
      this.adminDao = adminDao;
      this.teacherDao = teacherDao;
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
      return teacherDao.add(teacher);   }

   @Override
   public List<Teacher> getAllTeachers() {
      return teacherDao.getAll();   }

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
      return teacherDao.updateTeacherInfo(teacher);   }

}
