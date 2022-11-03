package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public class BookRepository extends JpaRepository<Book, Long> {



}
