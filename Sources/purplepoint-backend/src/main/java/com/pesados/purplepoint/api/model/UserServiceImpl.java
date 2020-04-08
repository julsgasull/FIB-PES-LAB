package com.pesados.purplepoint.api.model;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
 
    @Autowired
    private UserRepository userRepository;
 
    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }
	@Override
	public User saveUser(User newUser) {
		return userRepository.save(newUser);
	}
	@Override
	public void deleteUserById(Long id) {
		userRepository.deleteById(id);
	}
	@Override
    public Optional<User> getUserByToken(String token) {
        return userRepository.findByToken(token);
    }
}