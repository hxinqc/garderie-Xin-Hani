package com.sg.garderie.dao;

import com.sg.garderie.model.Activities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Repository
public class ActivitiesDaoImpl implements ActivitiesDao {
    @Autowired
    JdbcTemplate jdbc;
    @Override
    @Transactional
    public Activities addActivities(Activities activities) throws ActivitiesException{
        LocalDate ld = activities.getActivityDate();
        if (ld == null) {
            throw new ActivitiesException("Activity Date is needed.");
        }
        final String INSERT_ACTIVITIES = "INSERT INTO activities(name, activityDate, PicPath, Description) "
                + "VALUES(?,?,?,?)";
        jdbc.update(INSERT_ACTIVITIES,
                activities.getName(), ld, activities.getPicPath(), activities.getDescription());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        activities.setId(newId);
        return activities;
    }

    @Override
    public Activities getActivitiesById(int id) {
        try {
            final String SELECT_ACTIVITIES_BY_ID = "SELECT * FROM activities WHERE id = ?";
            return jdbc.queryForObject(SELECT_ACTIVITIES_BY_ID, new ActivitiesMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Activities> getActivitiesByDate(LocalDate activityDate) {
        try {
            final String SELECT_ACTIVITIES_BY_ID = "SELECT * FROM activities WHERE activityDate = ?";
            return jdbc.query(SELECT_ACTIVITIES_BY_ID, new ActivitiesMapper(), activityDate);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Activities> getAllActivities() {
        try {
            final String SELECT_ACTIVITIES_BY_ID = "SELECT * FROM activities ORDER BY activityDate desc";
            return jdbc.query(SELECT_ACTIVITIES_BY_ID, new ActivitiesMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void editActivities(Activities activities)  throws ActivitiesException {
        LocalDate ld = activities.getActivityDate();
        if (ld == null) {
            throw new ActivitiesException("Activity Date is needed.");
        }
        final String INSERT_ACTIVITIES = "UPDATE activities SET name=?, activityDate=?, PicPath=?, Description=? "
                + " WHERE id=?";
        jdbc.update(INSERT_ACTIVITIES,
                activities.getName(), ld, activities.getPicPath(), activities.getDescription(), activities.getId());

    }

    @Override
    public void deleteActivitiesById(int id) {
        final String DELETE_ACTIVITIES = "DELETE FROM activities  "
                + " WHERE id=?";
        jdbc.update(DELETE_ACTIVITIES, id);
    }

    public static final class ActivitiesMapper implements RowMapper<Activities> {
        @Override
        public Activities mapRow(ResultSet rs, int index) throws SQLException {
            Activities activities = new Activities();
            activities.setId(rs.getInt("id"));
            activities.setName(rs.getString("name"));
            activities.setActivityDate(rs.getTimestamp("activityDate").toLocalDateTime().toLocalDate());
            activities.setDescription(rs.getString("description"));
            activities.setPicPath(rs.getString("picPath"));

            return activities;
        }
    }
}
