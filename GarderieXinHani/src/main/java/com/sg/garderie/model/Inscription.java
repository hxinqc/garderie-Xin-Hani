package com.sg.garderie.model;

import java.time.LocalDate;
import java.util.Objects;

public class Inscription {
    private int id;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private LocalDate inscriptionDate;
    private int openPlace;
    private INSCRIPTION_STATUS status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDate getInscriptionDate() {
        return inscriptionDate;
    }

    public void setInscriptionDate(LocalDate inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public int getOpenPlace() {
        return openPlace;
    }

    public void setOpenPlace(int openPlace) {
        this.openPlace = openPlace;
    }

    public INSCRIPTION_STATUS getStatus() {
        return status;
    }

    public void setStatus(INSCRIPTION_STATUS status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Inscription that = (Inscription) o;
        return id == that.id && openPlace == that.openPlace && Objects.equals(firstName, that.firstName) && Objects.equals(lastName, that.lastName) && Objects.equals(phone, that.phone) && Objects.equals(address, that.address) && Objects.equals(inscriptionDate, that.inscriptionDate) && status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, phone, address, inscriptionDate, openPlace, status);
    }

    @Override
    public String toString() {
        return "Inscription{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", inscriptionDate=" + inscriptionDate +
                ", openPlace=" + openPlace +
                ", status=" + status +
                '}';
    }
}
