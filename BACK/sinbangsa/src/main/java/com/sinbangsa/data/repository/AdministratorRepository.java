package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> getAdminById(long adminId);

    Optional<Admin> getAdminByUserId(String adminName);
}
