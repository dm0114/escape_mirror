package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User getByEmail(String email);
}
