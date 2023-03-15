package com.sg.garderie.dao;

import com.sg.garderie.model.ActivitiesClassId;
import com.sg.garderie.model.ClassFood;
import com.sg.garderie.model.FoodsClassId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.IntStream;

@Repository
public class ClassFoodsDaoImpl implements ClassFoodsDao {

    @Autowired
    JdbcTemplate jdbc;

    @Override
    @Transactional
    public void addClassFoods(int classId, int[] ids) {
        final String INSERT_CLASS = "INSERT INTO ClassFood(classId, foodId) "
                + "VALUES(?,?)";
        int length = ids.length;
        IntStream.range(0, length)
                .forEach(index -> jdbc.update(INSERT_CLASS,
                        classId, ids[index]));
    }

    @Override
    public List<ClassFood> getClassFoodsByClassId(int classId) {
        try {
            final String SELECT_CLASS_BY_ID = "SELECT * FROM ClassFood WHERE classId = ?";
            return jdbc.query(SELECT_CLASS_BY_ID, new ClassFoodsMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ClassFood> getAllClassesFoods() {
        try {
            final String SELECT_CLASS_Foods_BY_ID = "SELECT * FROM ClassFood ";
            return jdbc.query(SELECT_CLASS_Foods_BY_ID, new ClassFoodsMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void deleteClassFoodsByClassId(int classId) {
        final String DELETE_CLASS_Foods = "DELETE FROM ClassFood "
                + " WHERE classId=?";
        jdbc.update(DELETE_CLASS_Foods, classId);

    }
// for display ClassFoodsId
    @Override
    public List<FoodsClassId> getAllFoodsClassDisplay(int classId) {
        try {
            final String SELECT_Foods_BY_ID = "SELECT Foods.*, ClassFood.classId " +
                    "FROM Foods LEFT JOIN ClassFood " +
                    "ON Foods.id = ClassFood.foodId " +
                    "WHERE ClassFood.classId = ? or ClassFood.classId is null " +
                    "ORDER BY offerDate desc";

            return jdbc.query(SELECT_Foods_BY_ID, new ClassFoodsDaoImpl.FoodsDisplayMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }    }

    public static final class ClassFoodsMapper implements RowMapper<ClassFood> {
        @Override
        public ClassFood mapRow(ResultSet rs, int index) throws SQLException {
            ClassFood classFood = new ClassFood();
            classFood.setClassId(rs.getInt("classId"));
            classFood.setFoodId(rs.getInt("foodId"));

            return classFood;
        }
    }


    public static final class FoodsDisplayMapper implements RowMapper<FoodsClassId> {
        @Override
        public FoodsClassId mapRow(ResultSet rs, int index) throws SQLException {
            FoodsClassId foodsClassId = new FoodsClassId();
            foodsClassId.setId(rs.getInt("id"));
            foodsClassId.setName(rs.getString("name"));
            foodsClassId.setOfferDate(rs.getTimestamp("offerDate").toLocalDateTime().toLocalDate());
            foodsClassId.setDescription(rs.getString("description"));
            foodsClassId.setPicPath(rs.getString("picPath"));
            if (rs.getObject("classId") != null)
                foodsClassId.setClassId(rs.getInt("classId"));

            return foodsClassId;
        }
    }

}
