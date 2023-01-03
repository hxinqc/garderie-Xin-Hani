package com.sg.garderie.dao;

public class FoodsException extends Exception{
    public FoodsException(String message) {
        super(message);
    }

    public FoodsException(String message, Throwable cause) {
        super(message, cause);
    }
}