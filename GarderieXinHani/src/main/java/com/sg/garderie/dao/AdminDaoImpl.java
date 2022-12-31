package com.sg.garderie.dao;

import com.sg.garderie.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;

import java.sql.*;
import java.util.List;

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
        final String sql = "INSERT INTO Admin(Name, Password, Description,IsActive) VALUES(?,?,?,?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, String.valueOf(admin.getName()));
            statement.setString(2, (admin.getPassword()));
            statement.setString(3, (admin.getDescription()));
            statement.setBoolean(4, (admin.isActive()));

            return statement;

        }, keyHolder);

        admin.setID(keyHolder.getKey().intValue());

        return admin;    }



    @Override
    public List<Admin> getAll() {
        final String sql = "SELECT ID, Name, Password, Description, IsActive FROM Admin;";
        return jdbcTemplate.query(sql, new AdminMapper());    }


    @Override
    public Admin findAdminById(int id) {
        final String sql = "SELECT ID, Name, Password, Description, IsActive "
                + "FROM Admin WHERE ID = ?;";

        return jdbcTemplate.queryForObject(sql, new AdminMapper(), id);
    }


    @Override
    public boolean deleteAdminById(int id) {
        final String sql = "DELETE FROM admin WHERE id = ?;";
        return jdbcTemplate.update(sql, id) > 0;
    }

    @Override
    public boolean updateAdminInfo(Admin admin) {
        final String sql = "UPDATE admin SET "
                + "name = ?, "
                + "password = ?, "
                + "description = ?, "
                + "isActive=?, "
                + "WHERE id = ?;";

        return jdbcTemplate.update(sql,
                admin.getName(),
                admin.getPassword(),
                admin.getDescription(),
                admin.isActive(),
                admin.getID())> 0;    }



    private static final class AdminMapper implements RowMapper<Admin> {
        @Override
        public Admin mapRow(ResultSet rs, int index) throws SQLException {
            Admin admin = new Admin();
            admin.setID(rs.getInt("ID"));
            admin.setName(rs.getString("Name"));
            admin.setPassword(rs.getString("Password"));
            admin.setDescription(rs.getString("Description"));
            admin.setActive(rs.getBoolean("IsActive"));
            return admin;
        }
    }
}
