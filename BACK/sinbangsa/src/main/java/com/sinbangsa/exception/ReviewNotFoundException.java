package com.sinbangsa.exception;

public class ReviewNotFoundException extends RuntimeException{
    public ReviewNotFoundException() {super("리뷰를 찾을 수 없습니다.");}

    public ReviewNotFoundException(String msg) {super(msg);}

    public ReviewNotFoundException(String msg, Throwable cause) {
        super(msg, cause);
    }

    protected ReviewNotFoundException(String msg, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(msg, cause, enableSuppression, writableStackTrace);
    }
}