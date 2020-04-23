package com.pesados.purplepoint.api.tests.controller;

import com.pesados.purplepoint.api.model.alarm.Alarm;
import com.pesados.purplepoint.api.model.alarm.AlarmRepository;
import com.pesados.purplepoint.api.model.location.Location;
import com.pesados.purplepoint.api.model.user.UserRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityManager;
import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
public class AlarmRepositoryTest {

    @Autowired(required = true)
    AlarmRepository alarmRepository;
    @Autowired private DataSource dataSource;
    @Autowired private JdbcTemplate jdbcTemplate;
    @Autowired private EntityManager entityManager;
    @Autowired private UserRepository userRepository;

    @Test
    void injectedComponentsAreNotNull(){
        assertNotNull(dataSource);
        assertNotNull(jdbcTemplate);
        assertNotNull(entityManager);
        assertNotNull(userRepository);
    }

    @ExtendWith(SpringExtension.class)
    @Test
    public void shouldFindByNearbyLocation() throws Exception {
        Location miCasa = new Location((float)41.447612, (float)2.224417, 100, 0);
        Location bar = new Location((float)41.447379, (float)2.226842, 100, 0);
        Location Cancun = new Location((float)21.160510, (float)-86.842466, 100, 0);
        Location Sarria = new Location((float)41.402899, (float)2.121561, 100, 0);

        Alarm alarmaCasa = new Alarm(
                "isma",
                miCasa,
                true);

        Alarm alarmaBar = new Alarm(
                "isma",
                bar,
                true);

        // Metemos informacion en el repositorio del test
        alarmRepository.save(alarmaCasa);
        alarmRepository.save(alarmaBar);
        alarmRepository.save(new Alarm(
                "isma",
                Cancun,
                true));

        alarmRepository.save(new Alarm(
                "isma",
                Sarria,
                true));

        // Creamos la lista que deberiamos obtener
        List<Alarm> expectedList = new ArrayList();
        expectedList.add(alarmaCasa);
        expectedList.add(alarmaBar);

        // Invocamos la funcion a testear
        float latitude = (float) 41.448420;
        float longitude = (float) 2.224409;
        List<Alarm> nearbyAlarms = alarmRepository.findByNearbyLocation(latitude, longitude);

        // Comprobamos que el resultado devuelto sea el correcto
        Assert.assertEquals(nearbyAlarms, expectedList);
    }
}
