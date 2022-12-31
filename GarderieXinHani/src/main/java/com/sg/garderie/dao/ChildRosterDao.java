package com.sg.garderie.dao;

import com.sg.garderie.model.ChildRoster;

import java.util.List;

public interface ChildRosterDao {
    ChildRoster addChildRoster(ChildRoster childRoster);
    ChildRoster getChildRosterById(int id);

    List<ChildRoster> getChildRostersByClassId(int id);
    List<ChildRoster> getAllChildRosters();
    void editChildRoster(ChildRoster childRoster);
    void deleteChildRosterById(int id);
}
