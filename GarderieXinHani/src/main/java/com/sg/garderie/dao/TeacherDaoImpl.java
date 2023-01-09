package com.sg.garderie.dao;

import com.sg.garderie.model.Admin;
import com.sg.garderie.model.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.*;
import java.util.List;

@Repository
public class TeacherDaoImpl implements TeacherDao{

    @Autowired
    JdbcTemplate jdbc;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TeacherDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Teacher add(Teacher teacher) {
        final String sql = "INSERT INTO Admin(Name, Password, Description,IsActive) VALUES(?,?,?,?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, String.valueOf(teacher.getFirstName()));
            statement.setString(2, (teacher.getLastName()));
            statement.setBoolean(3, (teacher.isActive()));

            return statement;

        }, keyHolder);

        teacher.setID(keyHolder.getKey().intValue());

        return teacher;      }



    @Override
    public List<Teacher> getAll() {
        final String sql = "SELECT ID, FirstName, LastName, IsActive FROM Teacher;";
        return jdbcTemplate.query(sql, new TeacherDaoImpl.TeacherMapper());     }

    @Override
    public Teacher findTeacherById(int id) {
        final String sql = "SELECT ID, FirstName, LastName, IsActive "
                + "FROM Teacher WHERE ID = ?;";

        return jdbcTemplate.queryForObject(sql, new TeacherDaoImpl.TeacherMapper(), id);    }

    @Override
    @Transactional
    public boolean deleteTeacherById(int id) {
        final String sql = "DELETE FROM Teacher WHERE id = ?;";
        return jdbcTemplate.update(sql, id) > 0;
    }

    @Override
    @Transactional
    public boolean updateTeacherInfo(Teacher teacher) {
        final String sql = "UPDATE admin SET "
                + "name = ?, "
                + "password = ?, "
                + "description = ?, "
                + "isActive=?, "
                + "WHERE id = ?;";

        return jdbcTemplate.update(sql,
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.isActive(),
                teacher.getID())> 0;
    }



    public static final class TeacherMapper implements RowMapper<Teacher> {
        @Override
        public Teacher mapRow(ResultSet rs, int index) throws SQLException {
            Teacher teacher = new Teacher();
            teacher.setID(rs.getInt("ID"));
            teacher.setFirstName(rs.getString("FirstName"));
            teacher.setLastName(rs.getString("LastName"));
            teacher.setActive(rs.getBoolean("IsActive"));
            return teacher;
        }
    }
}
