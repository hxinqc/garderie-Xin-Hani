package com.sg.garderie.dao;

import com.sg.garderie.model.ClassFood;
import com.sg.garderie.model.FoodsClassId;

import java.util.List;

public interface ClassFoodsDao  {

    public void addClassFoods(int classId, int[] foodsIds);
    List<ClassFood> getClassFoodsByClassId(int classId);
    List<ClassFood> getAllClassesFoods();
    void deleteClassFoodsByClassId(int classId);

    List<FoodsClassId> getAllFoodsClassDisplay(int classId);
}
