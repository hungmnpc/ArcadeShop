package com.monopoco.arcade.entity;


import lombok.Getter;

import java.util.stream.Stream;

@Getter
public enum Status {
    NONE(0), PROCESSING(1), SHIPPING(2), ACCOMPLISHED(3), CANCELLED(4);

    private Integer status;

    Status(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

    public static Status of (Integer status) {
        return Stream.of(Status.values())
                .filter(s -> s.getStatus() == status)
                .findFirst()
                .orElseThrow(IllegalAccessError::new);
    }

    public static Status copy(Status status) {
        return of(status.getStatus());
    }


    @Override
    public String toString() {
        switch (status) {
            case 1:
                return "PROCESSING";
            case 2:
                return "SHIPPING";
            case 3:
                return "ACCOMPLISHED";
            case 4:
                return "CANCELLED";
            default:
                return "NONE";
        }
    }
}
