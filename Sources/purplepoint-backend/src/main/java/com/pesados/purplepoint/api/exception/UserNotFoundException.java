package com.pesados.purplepoint.api.exception;

public class UserNotFoundException extends RuntimeException {

  public UserNotFoundException(Long id) {
    super("Could not find employee " + id);
  }
}