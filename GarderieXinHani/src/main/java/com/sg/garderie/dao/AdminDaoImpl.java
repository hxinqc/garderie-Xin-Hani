package com.sg.garderie.dao;

import com.sg.garderie.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.*;
import java.util.List;

@Repository
public class AdminDaoImpl implements AdminDao {

    @Autowired
    JdbcTemplate jdbc;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Admin add(Admin admin) {
        final String sql = "INSERT INTO Admin(name, password, description,isActive) VALUES(?,?,?,?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, String.valueOf(admin.getName()));
            statement.setString(2, (admin.getPassword()));
            statement.setString(3, (admin.getDescription()));
            statement.setBoolean(4, (admin.getIsActive()));

            return statement;

        }, keyHolder);

        admin.setID(keyHolder.getKey().intValue());

        return admin;    }



    @Override
    public List<Admin> getAllAdmin() {
        final String sql = "SELECT id, name, password, description, isActive FROM Admin;";
        return jdbcTemplate.query(sql, new AdminMapper());    }


    @Override
    public Admin findAdminById(int id) {
        final String sql = "SELECT id, name, password, description, isActive "
                + "FROM Admin WHERE id = ?;";

        return jdbcTemplate.queryForObject(sql, new AdminMapper(), id);
    }


    @Override
    @Transactional
    public boolean deleteAdminById(int id) {
        final String sql = "DELETE FROM Admin WHERE id = ?;";
        return jdbcTemplate.update(sql, id) > 0;
    }

    @Override
    @Transactional
    public boolean updateAdminInfo(Admin admin) {
        final String sql = "UPDATE Admin SET "
                + "name = ?, "
                + "password = ?, "
                + "description = ?, "
                + "isActive=? "
                + "WHERE id = ?;";

        return jdbcTemplate.update(sql,
                admin.getName(),
                admin.getPassword(),
                admin.getDescription(),
                admin.getIsActive(),
                admin.getID())> 0;    }



    private static final class AdminMapper implements RowMapper<Admin> {
        @Override
        public Admin mapRow(ResultSet rs, int index) throws SQLException {
            Admin admin = new Admin();
            admin.setID(rs.getInt("id"));
            admin.setName(rs.getString("name"));
            admin.setPassword(rs.getString("password"));
            admin.setDescription(rs.getString("description"));
            admin.setIsActive(rs.getBoolean("isActive"));
            return admin;
        }
    }
}
