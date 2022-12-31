package com.sg.garderie.dao;

import com.sg.garderie.model.ChildRoster;
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
public class ChildRosterDaoImpl implements ChildRosterDao {

    @Autowired
    JdbcTemplate jdbc;

    @Override
    @Transactional
    public ChildRoster addChildRoster(ChildRoster childRoster) {
        final String INSERT_CLASS_ROSTER = "INSERT INTO childRoster(classId, firstName, lastName, inscriptionId) "
                + "VALUES(?,?,?,?)";
        jdbc.update(INSERT_CLASS_ROSTER, childRoster.getClassId(),
                childRoster.getFirstName(), childRoster.getLastName(), childRoster.getInscriptionId());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        childRoster.setId(newId);
        return childRoster;
    }

    @Override
    public ChildRoster getChildRosterById(int id) {
        try {
            final String SELECT_CLASS_ROSTER_BY_ID = "SELECT * FROM childRoster WHERE id = ?";
            return jdbc.queryForObject(SELECT_CLASS_ROSTER_BY_ID, new ClassRosterMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ChildRoster> getChildRostersByClassId(int id) {
        try {
            final String SELECT_CLASS_ROSTER_BY_ID = "SELECT * FROM childRoster WHERE classId = ?";
            return jdbc.query(SELECT_CLASS_ROSTER_BY_ID, new ClassRosterMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<ChildRoster> getAllChildRosters() {
        try {
            final String SELECT_CLASS_ROSTER_BY_ID = "SELECT * FROM childRoster ";
            return jdbc.query(SELECT_CLASS_ROSTER_BY_ID, new ClassRosterMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void editChildRoster(ChildRoster childRoster) {
        final String UPDATE_CLASS_ROSTER = "UPDATE childRoster SET classId=?, firstName=?, lastName=?, inscriptionId=? "
                + " WHERE id=?";
        jdbc.update(UPDATE_CLASS_ROSTER, childRoster.getClassId(), childRoster.getFirstName(),
                 childRoster.getLastName(), childRoster.getInscriptionId(), childRoster.getId());

    }

    @Override
    public void deleteChildRosterById(int id) {
        final String DELETE_CLASS_ROSTER = "DELETE FROM childRoster  "
                + " WHERE id=?";
        jdbc.update(DELETE_CLASS_ROSTER, id);
    }

    public static final class ClassRosterMapper implements RowMapper<ChildRoster> {

        @Override
        public ChildRoster mapRow(ResultSet rs, int index) throws SQLException {
            ChildRoster childRoster = new ChildRoster();
            childRoster.setId(rs.getInt("id"));
            childRoster.setClassId(rs.getInt("classId"));
            childRoster.setFirstName(rs.getString("firstName"));
            childRoster.setLastName(rs.getString("lastName"));
            childRoster.setInscriptionId(rs.getInt("inscriptionId"));

            return childRoster;
        }
    }
}
