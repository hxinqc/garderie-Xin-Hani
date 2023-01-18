package com.sg.garderie.controller;

import com.sg.garderie.dao.NewsException;
import com.sg.garderie.model.News;
import com.sg.garderie.service.GarderieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validation;
import javax.validation.Validator;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
public class NewsController {

    @Autowired
    private GarderieService service;

    @PostMapping("/news")
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin
    public News addNews(@RequestParam("fileName") MultipartFile multipartFile, HttpServletRequest request) throws Exception {
        News news = new News();
        news.setName(request.getParameter("name"));
        String issueDate = request.getParameter("issueDate");
        news.setIssueDate(LocalDate.parse(issueDate, DateTimeFormatter.ISO_LOCAL_DATE));
        news.setContent(request.getParameter("content"));
        String fileName = multipartFile.getOriginalFilename();
        byte[] bytes = multipartFile.getBytes();
        String filePath = service.saveFile(fileName, bytes);
        news.setPicPath(filePath);

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<News>> violations = validator.validate(news);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        service.addNews(news);

        return news;
    }

    @GetMapping("/news/{id}")
    @CrossOrigin
    public News getNewsById(@PathVariable int id) throws NewsException{
        return service.getNewsById(id);
    }

    @GetMapping("/news/date/{date}")
    @CrossOrigin
    public List<News> getNewsByDate(@PathVariable LocalDate date) {
        return service.getNewsByDate(date);
    }

    @GetMapping("/news/latest")
    @CrossOrigin
    public List<News> getLatestNews() {
        return service.getLatestNews();
    }

    @GetMapping("/news")
    @CrossOrigin
    public List<News> getAllNews() {
        return service.getAllNews();
    }

    @PutMapping("/news/{id}")
    @CrossOrigin
    public News editNewsById(@PathVariable int id, @RequestParam("fileName") MultipartFile multipartFile,
                             HttpServletRequest request)
            throws IOException, NewsException {
        News news = new News();
        news.setId(id);
        news.setName(request.getParameter("name"));
        String issueDate = request.getParameter("issueDate");
        news.setIssueDate(LocalDate.parse(issueDate, DateTimeFormatter.ISO_LOCAL_DATE));
        news.setContent(request.getParameter("content"));
        String fileName = multipartFile.getOriginalFilename();
        byte[] bytes = multipartFile.getBytes();
        String filePath = service.saveFile(fileName, bytes);
        news.setPicPath(filePath);

        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<News>> violations = validator.validate(news);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        service.editNews(news);

        return news;
    }

    @DeleteMapping("/news/{id}")
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin
    public void deleteNewsById(@PathVariable int id) throws NewsException {
        service.deleteNewsById(id);
    }
}
