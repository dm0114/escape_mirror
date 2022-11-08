package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminStoreDto;
import com.sinbangsa.data.entity.Admin;

import java.util.List;

public interface AdministratorService {
    List<AdminStoreDto> getAdminStoreDetail(long adminId);
}
