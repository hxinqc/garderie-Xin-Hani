package com.sg.garderie.dao;

import com.sg.garderie.model.News;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface NewsDao {
    News addNews(News news);
    News getNewsById(int id);
    List<News> getNewsByDate(LocalDate issueDate);
    List<News> getLatestNews(int count);
    List<News> getAllNews();
    void editNews(News news);
    void deleteNewsById(int id);
}
