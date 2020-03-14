package com.example.demo.payroll.controller;

import java.util.*;
import java.util.function.*;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.payroll.model.User;
import com.example.demo.payroll.model.repository.UserRepository;
import com.example.demo.payroll.exception.UserNotFoundException;

@RestController
class UserController {

  private final UserRepository repository;

  UserController(UserRepository repository) {
    this.repository = repository;
  }

  // Aggregate root

  @GetMapping("/users")
  List<User> all() {
    return repository.findAll();
  }

  @PostMapping("/users")
  User newEmployee(@RequestBody User newEmployee) {
    return repository.save(newEmployee);
  }

  // Single item

  @GetMapping("/users/{id}")
  User one(@PathVariable Long id) {

    return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  @PutMapping("/users/{id}")
  User replaceEmployee(@RequestBody User newEmployee, @PathVariable Long id) {

    return repository.findById(id)
      .map(employee -> {
        employee.setName(newEmployee.getName());
        employee.setEmail(newEmployee.getEmail());
        return repository.save(employee);
      })
      .orElseGet(() -> {
        newEmployee.setId(id);
        return repository.save(newEmployee);
      });
  }

  @DeleteMapping("/users/{id}")
  void deleteEmployee(@PathVariable Long id) {
    repository.deleteById(id);
  }
}