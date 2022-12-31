package com.sg.garderie.dao;

import com.sg.garderie.model.Admin;

import java.util.List;

public interface AdminDao {

    Admin add(Admin admin);

    List<Admin> getAll();

    Admin findAdminById(int id);

    boolean deleteAdminById(int id);

    boolean updateAdminInfo(Admin admin);



}
