package com.sg.garderie.service;

import com.sg.garderie.model.Admin;

import java.util.List;

public interface GarderieService {
    Admin addAdmin(Admin admin);

    List<Admin> getAllAdmins();

    Admin findAdminById(int id);

    boolean deleteAdminById(int id);

    boolean updateAdminInfo(Admin admin);
}
