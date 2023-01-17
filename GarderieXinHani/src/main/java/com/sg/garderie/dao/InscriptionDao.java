package com.sg.garderie.dao;

import com.sg.garderie.model.INSCRIPTION_STATUS;
import com.sg.garderie.model.Inscription;
import com.sg.garderie.model.News;

import java.util.List;

public interface InscriptionDao {
    Inscription addInscription(Inscription inscription);
    Inscription getInscriptionById(int id);
    List<Inscription> getInscriptionByStatus(INSCRIPTION_STATUS status);
    List<Inscription> getAllInscription();
    void editInscription(Inscription inscription);
    void updateStatus(Integer id, String status);

}
