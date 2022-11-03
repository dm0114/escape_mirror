package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByThemeTimeIdAndDate(long themeTimeId, Date date);

}
