package com.sg.garderie.dao;

import com.sg.garderie.model.Admin;
import com.sg.garderie.model.Food;

import java.time.LocalDate;
import java.util.List;

public interface FoodDao {

    Food add(Food food);

    List<Food> getAll();

    List<Food> getAllFoodsByDateClassId(int classId, LocalDate date);

    Food findFoodById(int id);

    boolean deleteFoodById(int id);

    boolean updateFoodInfo(Food food);

}
