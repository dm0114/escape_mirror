package com.sinbangsa.data.repository;


import com.sinbangsa.data.entity.Book;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {


    @Query(value = "select count(theme) " +
            "from Book book " +
            "join Theme theme " +
            "on theme = book.bookTheme " +
            "where theme.store = :storeId and book.bookUser = :userId " +
            "and book.clear = 1 ")
    int getClearCnt(@Param("userId") User user , @Param("storeId") Store store);


}
