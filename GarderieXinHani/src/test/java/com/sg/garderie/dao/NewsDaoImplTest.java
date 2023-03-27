package com.sg.garderie.dao;

import com.sg.garderie.TestApplicationConfiguration;
import com.sg.garderie.model.News;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.annotation.Commit;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = TestApplicationConfiguration.class)
@Transactional(transactionManager = "txMgr")
@Rollback
class NewsDaoImplTest {

    @Autowired
    private NewsDao dao;
    @Autowired
    private JdbcTemplate jdbc;
    @Value("${timezone.frontend}")
    private String TIMEZONE;
    @Value("${timezone.db}")
    private String TIMEZONE_DB;

    @Transactional
    @Test
    @Commit
    void addNews() {
        News news = new News();
        String date = "2023-03-24 22:43:58";
        LocalDate issueDate;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        issueDate = LocalDate.parse(date, formatter);
        news.setIssueDate(issueDate);
        news.setName("name");
        news.setPicPath("/files");
        news.setContent("new news.");
        dao.addNews(news);
        try {
            final String SELECT_NEWS_BY_ID = "SELECT * FROM News WHERE id = ?";
            News retrieveNews = jdbc.queryForObject(SELECT_NEWS_BY_ID, new NewsDaoImpl.NewsMapper(TIMEZONE, TIMEZONE_DB), news.getId());
            assertEquals(news, retrieveNews);
        } catch (DataAccessException ex) {
            ex.printStackTrace();
        }
    }


    @Transactional
    @Sql("/import_news.sql")
    @Test
    void getNewsById() {
        News news = new News();
        String date = "2023-03-24 22:43:58";
        LocalDate issueDate;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        issueDate = LocalDate.parse(date, formatter);
        news.setId(1);
        news.setIssueDate(issueDate);
        news.setName("name");
        news.setPicPath("/files");
        news.setContent("new news.");

        News retrieveNews = dao.getNewsById(1);
        assertEquals(news, retrieveNews);
    }
}