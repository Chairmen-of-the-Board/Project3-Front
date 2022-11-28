package com.revature.exceptions;

public class DuplicateEmailFoundException extends RuntimeException{
    public DuplicateEmailFoundException() {
    }

    public DuplicateEmailFoundException(String message) {
        super(message);
    }

    public DuplicateEmailFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateEmailFoundException(Throwable cause) {
        super(cause);
    }

    public DuplicateEmailFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
