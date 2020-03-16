package com.pesados.purplepoint.api.controller;

import java.util.*;
import java.util.function.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;


import com.pesados.purplepoint.api.exception.UserNotFoundException;
import com.pesados.purplepoint.api.model.User;
import com.pesados.purplepoint.api.model.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class UserController {

  private final UserRepository repository;

  UserController(UserRepository repository) {
    this.repository = repository;
  }

  // Aggregate root
  @GetMapping("/users")
  @ApiOperation(value = "Gets a list of all users",
                response = User.class)
  List<User> all() {
    return repository.findAll();
  }

  @PostMapping("/users")
  @ApiOperation(value = "Creates a new, non-existing, user",
          response = User.class)
  User newUser(@RequestBody User newUser) {
    return repository.save(newUser);
  }

  // Single item

  @GetMapping("/users/{id}")
  @ApiOperation(value = "Gets an especfic user",
          notes = "Provide an ID to look up for a specific user",
          response = User.class)
  User one(@PathVariable Long id) {

    return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/users/{id}")
  @ApiOperation(value = "Update a user",
          notes = "Provide an ID to replace an existing user",
          response = User.class)
  User replaceUser(@RequestBody User newUser, @PathVariable Long id) {

    return repository.findById(id)
      .map(employee -> {
        employee.setName(newUser.getName());
        employee.setEmail(newUser.getEmail());
        return repository.save(employee);
      })
      .orElseGet(() -> {
        newUser.setId(id);
        return repository.save(newUser);
      });
  }

  @DeleteMapping("/users/{id}")
  @ApiOperation(value = "Deletes a user",
          notes = "Provide an ID to delete a specific user",
          response = User.class)
  void deleteUser(@PathVariable Long id) {
    repository.deleteById(id);
  }
}