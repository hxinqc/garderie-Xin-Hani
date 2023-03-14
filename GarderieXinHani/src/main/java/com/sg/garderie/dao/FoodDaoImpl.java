package com.sg.garderie.dao;

import com.sg.garderie.model.Admin;
import com.sg.garderie.model.Food;
import com.sg.garderie.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDate;
import java.util.List;

@Repository
public class FoodDaoImpl implements FoodDao{

    @Autowired
    JdbcTemplate jdbc;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FoodDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }



    @Override
    public Food add(Food food) {

        LocalDate ld = food.getOfferDate();
        if (ld == null) {
            ld = LocalDate.now();
        }

        final String sql = "INSERT INTO Foods(name, offerDate, description, picPath) VALUES(?,?,?,?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        LocalDate finalLd = ld;
        jdbcTemplate.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, String.valueOf(food.getName()));
            statement.setTimestamp(2, Timestamp.valueOf(finalLd.atStartOfDay()));
            statement.setString(3, (food.getDescription()));
            statement.setString(4, (food.getPicPath()));
            return statement;
        }, keyHolder);

        food.setID(keyHolder.getKey().intValue());
        return food;
    }

    @Override
    public List<Food> getAllFood() {
        final String sql = "SELECT id, name, offerDate, description, picPath FROM Foods;";
        return jdbcTemplate.query(sql, new FoodDaoImpl.FoodMapper());
    }


    @Override
    public List<Food> getAllFoodsByDateClassId(int classId, LocalDate offerDate) {
        try {
            final String SELECT_FOODS_FOR_Class = "SELECT F.* FROM Foods F "
            + "JOIN ClassFood CF ON F.id=CF.foodId "
            + "JOIN class C ON C.id=CF.classId WHERE C.id=? AND F.offerDate=?";

            return jdbc.query(SELECT_FOODS_FOR_Class, new FoodDaoImpl.FoodMapper(), classId, offerDate);
        } catch (DataAccessException ex) {
            return null;
        }
    }




    @Override
    public Food findFoodById(int id) {
        final String sql = "SELECT * FROM Foods WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new FoodDaoImpl.FoodMapper(), id);    }


    @Override
    public boolean deleteFoodById(int id) {
        final String sql = "DELETE FROM Foods WHERE id = ?;";
        return jdbcTemplate.update(sql, id) > 0;    }


    @Override
    public boolean updateFoodInfo(Food food) {
        final String sql = "UPDATE Foods SET "
                + "name = ?, "
                + "offerDate = ?, "
                + "description = ? "
                + "WHERE id = ?;";

        return jdbcTemplate.update(sql,
                food.getName(),
                food.getOfferDate(),
                food.getDescription(),
                food.getID())> 0;
    }


    private static final class FoodMapper implements RowMapper<Food> {
        @Override
        public Food mapRow(ResultSet rs, int index) throws SQLException {
            Food food = new Food();
            food.setID(rs.getInt("id"));
            food.setName(rs.getString("name"));
            food.setDescription(rs.getString("description"));
            food.setPicPath(rs.getString("picPath"));
            food.setOfferDate(LocalDate.from(rs.getTimestamp("offerDate").toLocalDateTime()));
            return food;
        }
    }

}
