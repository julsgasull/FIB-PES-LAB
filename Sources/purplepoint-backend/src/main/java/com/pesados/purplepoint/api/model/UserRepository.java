package com.pesados.purplepoint.api.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	public Optional<User> findByEmail(String email);

	public Optional<User> findByToken(String token);
}