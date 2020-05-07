package com.pesados.purplepoint.api.model.device;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository DeviceRepository;

    @Override
    public Optional<Device> getDeviceById(Long id) {
        return this.DeviceRepository.findById(id);
    }

    @Override
    public List<Device> getAll() {
        return this.DeviceRepository.findAll();
    }

    @Override
    public void deleteDeviceById(Long id) {
        this.DeviceRepository.deleteById(id);
    }

    @Override
    public Device saveDevice(Device newRep) {
        return this.DeviceRepository.save(newRep);
    }
}
