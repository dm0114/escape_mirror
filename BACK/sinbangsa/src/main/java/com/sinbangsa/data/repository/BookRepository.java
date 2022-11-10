package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Book;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {


    @Query(value = "select count(theme) " +
            "from Book book " +
            "join Theme theme " +
            "on theme = book.bookTheme " +
            "where theme.store = :storeId and book.bookUser = :userId " +
            "and book.clear = 1 ")
    int getClearCnt(@Param("userId") User user , @Param("storeId") Store store);

    Optional<Book> findByBookThemeAndBookUser(Theme theme, User user);

    @Query(value = "select book " +
            "from Book book " +
            "where book.bookTheme = :theme " +
            "and book.clear = 1 " +
            "order by book.clearTime asc ")
    Optional<List<Book>> getAllBook(Theme theme);

    List<Book> findAllByBookUser(User user);

    Book findById(long bookId);



}
