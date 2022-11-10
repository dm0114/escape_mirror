package com.sinbangsa.exception;

public class ThemeTimeNotFoundException extends RuntimeException{
    public ThemeTimeNotFoundException() {super("테마 시간을 찾을 수 없습니다.");}

    public ThemeTimeNotFoundException(String msg) {super(msg);}

    public ThemeTimeNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public ThemeTimeNotFoundException(Throwable cause) {super(cause);}

    protected ThemeTimeNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}
