package com.pesados.purplepoint.api.model.image;

import java.util.List;
import java.util.Optional;

public interface ImageService {


	Optional<Image> getImageById(Long id);
	
	Optional<Image> getImageByName(String name);

	List<Image> getAll();

	Image saveImage(Image newImage);

	void deleteImageById(Long id);
	
	void deleteImageByName(String name);


}
