package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByNickname(String nickname);

    Optional<User> getByEmail(String email);

    Optional<User> findById(long userId);
    boolean existsByNickname(String nickname);

    boolean existsByEmail(String email);

}