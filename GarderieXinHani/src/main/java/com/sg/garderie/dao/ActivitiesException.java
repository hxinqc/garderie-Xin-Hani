package com.sg.garderie.dao;

public class ActivitiesException extends Exception{
    public ActivitiesException(String message) {
        super(message);
    }

    public ActivitiesException(String message, Throwable cause) {
        super(message, cause);
    }
}
