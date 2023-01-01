package com.sg.garderie.dao;

import com.sg.garderie.model.ClassEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ClassEntityDaoImpl implements ClassEntityDao {
    @Autowired
    JdbcTemplate jdbc;
    @Override
    @Transactional
    public ClassEntity addClass(ClassEntity classEntity) {
        final String INSERT_CLASS = "INSERT INTO class(name, openDate) "
                + "VALUES(?,?)";
        jdbc.update(INSERT_CLASS,
                classEntity.getName(), classEntity.getOpenDate());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        classEntity.setId(newId);
        return classEntity;
    }

    @Override
    public ClassEntity getClassById(int id) {
        try {
            final String SELECT_CLASS_BY_ID = "SELECT * FROM class WHERE id = ?";
            return jdbc.queryForObject(SELECT_CLASS_BY_ID, new ClassMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ClassEntity> getAllClasses() {
        try {
            final String SELECT_CLASS = "SELECT * FROM class";
            return jdbc.query(SELECT_CLASS, new ClassMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void editClass(ClassEntity classEntity) {
        final String UPDATE_CLASS = "UPDATE class SET name=?, openDate=? "
                + " WHERE id=?";
        jdbc.update(UPDATE_CLASS,
                classEntity.getName(), classEntity.getOpenDate(), classEntity.getId());
    }

    @Override
    public void deleteClassById(int id) {
        final String DELETE_CLASS = "DELETE FROM class  "
                + " WHERE id=?";
        jdbc.update(DELETE_CLASS, id);
    }

    public static final class ClassMapper implements RowMapper<ClassEntity> {
        @Override
        public ClassEntity mapRow(ResultSet rs, int index) throws SQLException {
            ClassEntity classEntity = new ClassEntity();
            classEntity.setId(rs.getInt("id"));
            classEntity.setName(rs.getString("name"));
            classEntity.setOpenDate(rs.getTimestamp("openDate").toLocalDateTime().toLocalDate());

            return classEntity;
        }
    }
}
