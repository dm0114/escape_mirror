package com.sinbangsa.exception;

public class ReservationNotFound extends RuntimeException {

    public ReservationNotFound() {
        super("예약을 찾을 수 없습니다.");
    }

    public ReservationNotFound(String msg) {
        super(msg);
    }

    public ReservationNotFound(String msg, Throwable cause) {
        super(msg, cause);
    }

    public ReservationNotFound(Throwable cause) {
        super(cause);
    }

    protected ReservationNotFound(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
