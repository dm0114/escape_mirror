package com.sinbangsa.data.repository;

import com.sinbangsa.data.dto.TransferDto;
import com.sinbangsa.data.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Optional<Reservation> findByReservationId(Long reservationId);
    boolean existsByThemeTimeIdAndDate(long themeTimeId, String date);

    boolean existsByThemeTimeAndDate(ThemeTime themeTime, String date);

    List<Reservation> findAllByReservationUser(User user);

    Optional<Reservation> findByDateAndThemeTime(String date, ThemeTime themeTime);
    Optional<Reservation> findById(long reservationId);

    @Query(value = "select reservation " +
            "from Reservation reservation " +
            "where reservation.status = 1")
    List<Reservation> getTransfer();


    @Query(value = "select count(reservation.reservation_id) " +
            "from reservation " +
            "INNER JOIN theme_time " +
            "ON reservation.themetime_id = theme_time.id " +
            "INNER JOIN theme " +
            "ON theme_time.theme_id = theme.id " +
            "WHERE reservation.date = :day " +
            "AND theme.store_id = :store " +
            "AND reservation.accept = true ", nativeQuery = true)
    Integer getCountAccepted(@Param("day") String date, @Param("store") Long storeId);

    @Query(value = "select count(reservation.reservation_id) " +
            "from reservation " +
            "INNER JOIN theme_time " +
            "ON reservation.themetime_id = theme_time.id " +
            "INNER JOIN theme " +
            "ON theme_time.theme_id = theme.id " +
            "WHERE reservation.date = :day " +
            "AND theme.store_id = :store " +
            "AND reservation.accept = false ", nativeQuery = true)
    Integer getCountWaiting(@Param("day") String date, @Param("store") Long storeId);
}
