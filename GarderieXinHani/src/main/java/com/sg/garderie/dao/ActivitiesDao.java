package com.sg.garderie.dao;

import com.sg.garderie.model.Activities;

import java.time.LocalDate;
import java.util.List;

public interface ActivitiesDao {
    Activities addActivities(Activities activities) throws ActivitiesException;
    Activities getActivitiesById(int id);
    List<Activities> getActivitiesByDate(LocalDate issueDate);
    List<Activities> getAllActivities();
    void editActivities(Activities activities) throws ActivitiesException;
    void deleteActivitiesById(int id);
}
