package com.sg.garderie.model;

import java.time.LocalDate;
import java.util.Objects;

public class News {
    private int id;
    private String name;
    private LocalDate issueDate;
    private String picPath;
    private String content;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        News news = (News) o;
        return id == news.id && Objects.equals(name, news.name) && Objects.equals(issueDate, news.issueDate) && Objects.equals(picPath, news.picPath) && Objects.equals(content, news.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, issueDate, picPath, content);
    }

    @Override
    public String toString() {
        return "News{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", issueDate=" + issueDate +
                ", picPath='" + picPath + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
