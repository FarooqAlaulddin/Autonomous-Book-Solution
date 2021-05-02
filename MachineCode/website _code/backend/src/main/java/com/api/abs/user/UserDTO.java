// Define the UserDTO model class as follows.
// It is responsible for getting values from user and passing it to the DAO layer for inserting in database.

package com.api.abs.user;

public class UserDTO {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}