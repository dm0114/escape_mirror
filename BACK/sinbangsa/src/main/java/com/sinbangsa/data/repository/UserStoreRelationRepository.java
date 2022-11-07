package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.UserStoreRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStoreRelationRepository extends JpaRepository<UserStoreRelation, Long> {


}

