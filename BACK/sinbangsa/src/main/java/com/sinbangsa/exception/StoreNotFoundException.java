package com.sinbangsa.exception;

public class StoreNotFoundException extends RuntimeException{
    public StoreNotFoundException() {super("테마를 찾을 수 없습니다.");}

    public StoreNotFoundException(String msg) {super(msg);}

    public StoreNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public StoreNotFoundException(Throwable cause) {super(cause);}

    protected StoreNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
