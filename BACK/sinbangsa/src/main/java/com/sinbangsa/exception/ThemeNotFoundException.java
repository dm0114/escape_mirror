package com.sinbangsa.exception;

public class ThemeNotFoundException extends RuntimeException{
    public ThemeNotFoundException() {super("테마를 찾을 수 없습니다.");}

    public ThemeNotFoundException(String msg) {super(msg);}

    public ThemeNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public ThemeNotFoundException(Throwable cause) {super(cause);}

    protected ThemeNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }

}
