package com.sinbangsa.service;


import com.sinbangsa.data.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookServiceImpl {

    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private final BookRepository bookRepository;



}
