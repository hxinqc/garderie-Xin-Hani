package com.sg.garderie.dao;

import com.sg.garderie.model.INSCRIPTION_STATUS;
import com.sg.garderie.model.Inscription;
import com.sg.garderie.model.News;
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
public class InscriptionDaoImpl implements InscriptionDao {
    @Autowired
    JdbcTemplate jdbc;
    @Override
    @Transactional
    public Inscription addInscription(Inscription inscription) {
        final String INSERT_INSCRIPTION = "INSERT INTO inscription(FirstName, LastName, Phone, "
                +"Address, InscriptionDate, OpenPlace, Status) "
                + "VALUES(?,?,?,?,?,?,?)";
        jdbc.update(INSERT_INSCRIPTION,
                inscription.getFirstName(), inscription.getLastName(), inscription.getPhone(),
                inscription.getAddress(), inscription.getInscriptionDate(), inscription.getOpenPlace(),
                inscription.getStatus().name());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        inscription.setId(newId);
        return inscription;
    }

    @Override
    public Inscription getInscriptionById(int id) {
        try {
            final String SELECT_INSCRIPTION_BY_ID = "SELECT * FROM inscription WHERE id = ?";
            return jdbc.queryForObject(SELECT_INSCRIPTION_BY_ID, new InscriptionMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Inscription> getInscriptionByStatus(INSCRIPTION_STATUS status) {
        try {
            final String SELECT_INSCRIPTION_BY_ID = "SELECT * FROM inscription WHERE status = ?";
            return jdbc.query(SELECT_INSCRIPTION_BY_ID, new InscriptionMapper(), status.name());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Inscription> getAllInscription() {
        try {
            final String SELECT_INSCRIPTION_BY_ID = "SELECT * FROM inscription ";
            return jdbc.query(SELECT_INSCRIPTION_BY_ID, new InscriptionMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void editInscription(Inscription inscription) {
        final String UPDATE_INSCRIPTION = "UPDATE inscription SET FirstName=?, LastName=?, Phone=?, "
                + "Address=?, InscriptionDate=?, OpenPlace=?, Status=? WHERE id=?";
        jdbc.update(UPDATE_INSCRIPTION,
                inscription.getFirstName(), inscription.getLastName(), inscription.getPhone(),
                inscription.getAddress(), inscription.getInscriptionDate(), inscription.getOpenPlace(),
                inscription.getStatus().name(), inscription.getId());
    }

    public static final class InscriptionMapper implements RowMapper<Inscription> {

        @Override
        public Inscription mapRow(ResultSet rs, int index) throws SQLException {
            Inscription inscription = new Inscription();
            inscription.setId(rs.getInt("id"));
            inscription.setFirstName(rs.getString("firstName"));
            inscription.setLastName(rs.getString("lastName"));
            inscription.setInscriptionDate(rs.getTimestamp("inscriptionDate").toLocalDateTime().toLocalDate());
            inscription.setAddress(rs.getString("address"));
            inscription.setPhone(rs.getString("phone"));
            inscription.setOpenPlace(rs.getInt("openPlace"));
            inscription.setStatus(INSCRIPTION_STATUS.valueOf(rs.getString("status")));

            return inscription;
        }
    }
}
