package com.pesados.purplepoint.api.model.image;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
	Optional<Image> findByName(String name);

	void deleteByName(String name);
}
