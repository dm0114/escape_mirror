package com.sinbangsa.data.repository;

import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.User;
import com.sinbangsa.data.entity.UserThemeRelation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserThemeRelationRepository extends JpaRepository<UserThemeRelation, Long> {

    Boolean existsByUserRelationThemeAndThemeRelationUser(Theme theme, User user);

    UserThemeRelation findByUserRelationThemeAndThemeRelationUser(Theme theme, User user);
}
