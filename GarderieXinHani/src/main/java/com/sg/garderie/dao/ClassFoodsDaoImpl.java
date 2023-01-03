package com.sg.garderie.dao;

import com.sg.garderie.model.ClassFood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.IntStream;

public class ClassFoodsDaoImpl implements ClassFoodsDao {

    @Autowired
    JdbcTemplate jdbc;

    @Override
    public void addClassFoods(int classId, int[] ids) {
        final String INSERT_CLASS = "INSERT INTO ClassFoods(classId, foodId) "
                + "VALUES(?,?)";
        int length = ids.length;
        IntStream.range(0, length)
                .forEach(index -> jdbc.update(INSERT_CLASS,
                        classId, ids[index]));
    }

    @Override
    public List<ClassFood> getClassFoodsByClassId(int classId) {
        try {
            final String SELECT_CLASS_BY_ID = "SELECT * FROM ClassFoods WHERE classId = ?";
            return jdbc.query(SELECT_CLASS_BY_ID, new ClassFoodsMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ClassFood> getAllClassesFoods() {
        try {
            final String SELECT_CLASS_Foods_BY_ID = "SELECT * FROM ClassFoods ";
            return jdbc.query(SELECT_CLASS_Foods_BY_ID, new ClassFoodsMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void deleteClassFoodsByClassId(int classId) {
        final String DELETE_CLASS_Foods = "DELETE FROM ClassFoods  "
                + " WHERE classId=?";
        jdbc.update(DELETE_CLASS_Foods, classId);

    }

    public static final class ClassFoodsMapper implements RowMapper<ClassFood> {
        @Override
        public ClassFood mapRow(ResultSet rs, int index) throws SQLException {
            ClassFood classFood = new ClassFood();
            classFood.setClassId(rs.getInt("classId"));
            classFood.setFoodId(rs.getInt("foodId"));

            return classFood;
        }
    }
}
