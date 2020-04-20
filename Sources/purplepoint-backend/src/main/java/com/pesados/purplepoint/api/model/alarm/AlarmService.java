package com.pesados.purplepoint.api.model.alarm;

import java.util.List;
import java.util.Optional;

public interface AlarmService {

	Optional<Alarm> getAlarmById(Long id);

	List<Alarm> getAll();

	Alarm saveAlarm(Alarm newAlarm);

	void deleteAlarmById(Long id);

}