package com.example.demo.payroll.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.payroll.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}