package com.pesados.purplepoint.api.model.device;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public Optional<Device> getDeviceById(Long id) { return this.deviceRepository.findById(id); }

    @Override
    public Optional<Device> getDeviceByFirebaseToken(String token) { return deviceRepository.findByFirebaseToken(token); }

    @Override
    public List<Device> getAll() {
        return this.deviceRepository.findAll();
    }

    @Override
    public void deleteDeviceById(Long id) {
        this.deviceRepository.deleteById(id);
    }

    @Override
    public Device saveDevice(Device newRep) {
        return this.deviceRepository.save(newRep);
    }
}
