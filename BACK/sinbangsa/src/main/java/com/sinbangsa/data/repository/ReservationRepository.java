package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Reservation;
import com.sinbangsa.data.entity.ThemeTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByThemeTimeIdAndDate(long themeTimeId, Date date);

    List<Reservation> findAllByThemeTimeIdAndDate(long themeId, String date);
}
