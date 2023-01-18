package com.sg.garderie.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class News {
    private int id;
    @NotNull(message = "Name is mandatory")
    private String name;
    @NotNull(message = "IssueDate is mandatory")
    private LocalDate issueDate;
    @NotBlank(message = "Picture is mandatory")
    private String picPath;
    private String content;

}
