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
    public Optional<Device> getDeviceById(String id) { return this.deviceRepository.findById(id); }

    @Override
    public List<Device> getAll() {
        return this.deviceRepository.findAll();
    }

    @Override
    public void deleteDeviceById(String id) {
        this.deviceRepository.deleteById(id);
    }

    @Override
    public Device saveDevice(Device newRep) {
        return this.deviceRepository.save(newRep);
    }
}
