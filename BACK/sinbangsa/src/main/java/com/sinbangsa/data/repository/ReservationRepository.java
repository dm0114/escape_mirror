package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Reservation;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeTime;
import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByThemeTimeIdAndDate(long themeTimeId, String date);

    boolean existsByThemeTimeAndDate(ThemeTime themeTime, String date);

    List<Reservation> findAllByReservationUser(User user);

    Optional<Reservation> findByDateAndThemeTime(Date date, ThemeTime themeTime);
}
