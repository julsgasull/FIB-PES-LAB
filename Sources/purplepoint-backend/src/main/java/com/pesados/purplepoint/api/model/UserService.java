package com.pesados.purplepoint.api.model;

import java.util.List;
import java.util.Optional;

public interface UserService {

	Optional<User> getUserByEmail(String email);

	Optional<User> getUserById(Long id);

	List<User> getAll();

	User saveUser(User newUser);

	void deleteUserById(Long id);

}
