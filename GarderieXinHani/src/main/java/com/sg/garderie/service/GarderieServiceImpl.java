package com.sg.garderie.service;

import com.sg.garderie.dao.AdminDao;
import com.sg.garderie.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarderieServiceImpl implements GarderieService {

   @Autowired
   private AdminDao adminDao;

   @Autowired
   public GarderieServiceImpl(AdminDao adminDao){
      this.adminDao = adminDao;
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
}
