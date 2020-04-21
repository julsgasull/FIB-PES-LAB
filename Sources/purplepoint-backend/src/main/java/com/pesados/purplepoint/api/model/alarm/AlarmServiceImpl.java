package com.pesados.purplepoint.api.model.alarm;

import com.pesados.purplepoint.api.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class AlarmServiceImpl implements AlarmService {

	@Autowired
	private AlarmRepository alarmRepository;

	@Override
	public Optional<Alarm> getAlarmById(Long id) {
		return alarmRepository.findById(id);
	}
	@Override
	public Alarm saveAlarm(Alarm newAlarm) {
		return alarmRepository.save(newAlarm);
	}
	@Override
	public void deleteAlarmById(Long id) {
		alarmRepository.deleteById(id);
	}
	@Override
	public List<Alarm> getAll() {
		return alarmRepository.findAll();
	}
	@Override
	public Optional<Alarm> getAlarmByUsername(String usernamme) {
		return alarmRepository.findByUsername(usernamme);
	}
}