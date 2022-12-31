package com.sg.garderie.dao;

import com.sg.garderie.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public class NewsDaoImpl implements NewsDao {

    @Autowired
    JdbcTemplate jdbc;

    @Override
    @Transactional
    public News addNews(News news) {
        LocalDate ld = news.getIssueDate();
        if (ld == null) {
            ld = LocalDate.now();
        }
        final String INSERT_NEWS = "INSERT INTO news(name, IssueDate, PicPath, Content) "
                + "VALUES(?,?,?,?)";
        jdbc.update(INSERT_NEWS,
                news.getName(), ld, news.getPicPath(), news.getContent());

        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        news.setId(newId);
        return news;
    }

    @Override
    public News getNewsById(int id) {
        try {
            final String SELECT_NEWS_BY_ID = "SELECT * FROM News WHERE id = ?";
            return jdbc.queryForObject(SELECT_NEWS_BY_ID, new NewsMapper(), id);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<News> getNewsByDate(LocalDate issueDate) {
        try {
            final String SELECT_NEWS_BY_ID = "SELECT * FROM News WHERE issueDate = ?";
            return jdbc.query(SELECT_NEWS_BY_ID, new NewsMapper(), issueDate);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<News> getAllNews() {
        try {
            final String SELECT_NEWS_BY_ID = "SELECT * FROM News ";
            return jdbc.query(SELECT_NEWS_BY_ID, new NewsMapper());
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public void editNews(News news) {
        final String UPDATE_NEWS = "UPDATE news SET name=?, IssueDate=?, PicPath=?, Content=? "
                + " WHERE id=?";
        jdbc.update(UPDATE_NEWS,
                news.getName(), news.getIssueDate(), news.getPicPath(), news.getContent(), news.getId());

    }

    @Override
    public void deleteNewsById(int id) {
        final String DELETE_NEWS = "DELETE FROM news  "
                + " WHERE id=?";
        jdbc.update(DELETE_NEWS, id);
    }

    public static final class NewsMapper implements RowMapper<News> {

        @Override
        public News mapRow(ResultSet rs, int index) throws SQLException {
            News news = new News();
            news.setId(rs.getInt("id"));
            news.setName(rs.getString("name"));
            news.setIssueDate(rs.getTimestamp("issueDate").toLocalDateTime().toLocalDate());
            news.setContent(rs.getString("content"));
            news.setPicPath(rs.getString("picPath"));

            return news;
        }
    }
}
