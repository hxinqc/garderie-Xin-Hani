package com.sg.garderie.service;

import com.sg.garderie.dao.NewsException;
import com.sg.garderie.model.News;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface GarderieService {
    News addNews(News news);
    String saveFile(String fileName, byte[] bytes) throws IOException;
    News getNewsById(int id) throws NewsException;
    List<News> getNewsByDate(LocalDate date);
    List<News> getAllNews();
    void editNews(News news) throws NewsException;
    void deleteNewsById(int id) throws NewsException;
}
