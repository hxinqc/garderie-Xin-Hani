package com.sg.garderie.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class News {
    private int id;
    private String name;
    private LocalDate issueDate;
    private String picPath;
    private String content;

}
