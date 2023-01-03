package com.sg.garderie.dao;

import com.sg.garderie.model.ClassActivities;
import com.sg.garderie.model.ClassEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Repository
public class ClassActivitiesDaoImpl implements ClassActivitiesDao {

    @Autowired
    JdbcTemplate jdbc;

    @Override
    @Transactional
    public void addClassActivities(int classId, int[] ids) {
        final String INSERT_CLASS = "INSERT INTO ClassActivities(classId, activityId) "
                + "VALUES(?,?)";
        int length = ids.length;
        IntStream.range(0, length)
                .forEach(index -> jdbc.update(INSERT_CLASS,
                        classId, ids[index]));

    }

    @Override
    public List<ClassActivities> getClassActivitiesByClassId(int classId) {
        try {
            final String SELECT_CLASS_BY_ID = "SELECT * FROM ClassActivities WHERE classId = ?";
            return jdbc.query(SELECT_CLASS_BY_ID, new ClassActivitiesMapper(), classId);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ClassActivities> getAllClassesActivities() {
        try {
            final String SELECT_CLASS_ACTIVITIES_BY_ID = "SELECT * FROM ClassActivities ";
            return jdbc.query(SELECT_CLASS_ACTIVITIES_BY_ID, new ClassActivitiesMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void deleteClassActivitiesByClassId(int classId) {
        final String DELETE_CLASS_ACTIVITIES = "DELETE FROM ClassActivities  "
                + " WHERE classId=?";
        jdbc.update(DELETE_CLASS_ACTIVITIES, classId);
    }

    public static final class ClassActivitiesMapper implements RowMapper<ClassActivities> {
        @Override
        public ClassActivities mapRow(ResultSet rs, int index) throws SQLException {
            ClassActivities classActivities = new ClassActivities();
            classActivities.setClassId(rs.getInt("classId"));
            classActivities.setActivityId(rs.getInt("activityId"));

            return classActivities;
        }
    }
}
