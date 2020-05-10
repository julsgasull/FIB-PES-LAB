package com.pesados.purplepoint.api.exception;

public class DeviceNotFoundException extends RuntimeException{
        private static final long serialVersionUID = 1L;

        public DeviceNotFoundException(String id) {
            super("Could not find device with id: " + id);
        }
}
