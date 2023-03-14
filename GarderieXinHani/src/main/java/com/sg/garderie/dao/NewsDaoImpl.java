package com.sg.garderie.dao;

import com.sg.garderie.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.Local;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Repository
public class NewsDaoImpl implements NewsDao {

    @Autowired
    JdbcTemplate jdbc;
    @Value("${timezone.frontend}")
    private String TIMEZONE;
    @Value("${timezone.db}")
    private String TIMEZONE_DB;

    @Override
    @Transactional
    public News addNews(News news) {
        LocalDate ld = news.getIssueDate();

        if (ld == null) {
            ld = LocalDate.now();
        } else {
            Date date = Date.from(ld.atStartOfDay(ZoneId.of(TIMEZONE)).toInstant());
            ld = date.toInstant().atZone(ZoneId.of(TIMEZONE_DB)).toLocalDate();
        }

        final String INSERT_NEWS = "INSERT INTO News(name, issueDate, picPath, content) "
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
    public List<News> getNewsByDate(String issueDate) {
        try {
            final String SELECT_NEWS_BY_ID = "SELECT * FROM News WHERE issueDate = ?";
            return jdbc.query(SELECT_NEWS_BY_ID, new NewsMapper(), issueDate);
        } catch (DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<News> getLatestNews(int count) {
        try {
            final String SELECT_NEWS_BY_ID = "SELECT * FROM News ORDER BY issueDate DESC limit " +
                    count;
            return jdbc.query(SELECT_NEWS_BY_ID, new NewsMapper());
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
        final String UPDATE_NEWS = "UPDATE News SET name=?, issueDate=?, picPath=?, content=? "
                + " WHERE id=?";
        jdbc.update(UPDATE_NEWS,
                news.getName(), news.getIssueDate(), news.getPicPath(), news.getContent(), news.getId());

    }

    @Override
    public void deleteNewsById(int id) {
        final String DELETE_NEWS = "DELETE FROM News  "
                + " WHERE id=?";
        jdbc.update(DELETE_NEWS, id);
    }

    public static final class NewsMapper implements RowMapper<News> {

        @Override
        public News mapRow(ResultSet rs, int index) throws SQLException {
            News news = new News();
            news.setId(rs.getInt("id"));
            news.setName(rs.getString("name"));

            java.util.Calendar cal = Calendar.getInstance();
            cal.setTimeZone(TimeZone.getTimeZone("UTC"));
            java.sql.Timestamp ts = rs.getTimestamp("issueDate");
            cal.setTime(ts);
            news.setIssueDate(LocalDate.ofInstant(cal.toInstant(), ZoneId.of("UTC")));

            news.setContent(rs.getString("content"));
            news.setPicPath(rs.getString("picPath"));

            return news;
        }
    }
}
