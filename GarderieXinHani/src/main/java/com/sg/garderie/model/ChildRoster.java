package com.sg.garderie.model;

import lombok.Data;

@Data
public class ChildRoster {
    private int id;
    private Integer classId;
    private String firstName;
    private String lastName;
    private Integer inscriptionId;

}
