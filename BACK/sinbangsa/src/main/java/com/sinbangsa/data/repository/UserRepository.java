package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User getByEmail(String email);

    User getById(long id);

}