package com.sg.garderie.dao;

import com.sg.garderie.model.Food;

import java.time.LocalDate;
import java.util.List;

public class FoodDaoImpl implements FoodDao{
    @Override
    public Food add(Food food) {
        return null;
    }

    @Override
    public List<Food> getAll() {
        return null;
    }

    @Override
    public List<Food> getAllFoodsByDateClassId(int classId, LocalDate date) {
        return null;
    }

    @Override
    public Food findFoodById(int id) {
        return null;
    }

    @Override
    public boolean deleteFoodById(int id) {
        return false;
    }

    @Override
    public boolean updateFoodInfo(Food food) {
        return false;
    }
}
