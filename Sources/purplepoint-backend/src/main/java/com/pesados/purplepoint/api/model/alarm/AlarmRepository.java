package com.pesados.purplepoint.api.model.alarm;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
	double r_earth = 6378.137;
	double pi = 3.14159265359;

	public Optional<Alarm> findByUsername(String email);

	@Query(value = "SELECT alarm " +
			"FROM Alarm a " +
			"WHERE a.location.latitude > ?1 + (500 / 6378.137) * (180 / 3.14159265359) and a.location.longitude > ?1 - (500 / 6378.137) * (180 / 3.14159265359)" +
			" and a.location.longitude <  ?2 + (500 / 6378.137) * (180 / 3.14159265359) and a.location.longitude > ?2 - (500 / 6378.137) * (180 / 3.14159265359)", nativeQuery = true)
	public List<Alarm> findByNearbyLocation(float latitude, float longitude);
}