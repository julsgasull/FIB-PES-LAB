package com.pesados.purplepoint.api.model.device;

import java.util.List;
import java.util.Optional;

public interface DeviceService {

    Optional<Device> getDeviceById(String id);

    List<Device> getAll();

    void deleteDeviceById(String id);

    Device saveDevice(Device newRep);

}
