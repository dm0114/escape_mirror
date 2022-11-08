package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminStoreDto;
import com.sinbangsa.data.entity.Admin;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.repository.AdministratorRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdministratorServiceImpl implements AdministratorService {
    private final Logger LOGGER = LoggerFactory.getLogger(AdministratorServiceImpl.class);
    private final AdministratorRepository administratorRepository;
    @Override
    public List<AdminStoreDto> getAdminStoreDetail(long adminId){
        LOGGER.info("[AdministratorService] getAdminStoreDetail 호출");
        Admin admin = administratorRepository.getAdminById(adminId).orElse(null);
        List<Store> adminStoreList;
        List<AdminStoreDto> adminStoreDtos = new ArrayList<>();

        if (admin.getStores().size() == 0) {
            return adminStoreDtos;
        }else {
            adminStoreList = admin.getStores();
            for (Store adminStore : adminStoreList) {
                AdminStoreDto adminStoreDetail = new AdminStoreDto();
                adminStoreDetail.setStoreImg(adminStore.getPoster());
                adminStoreDetail.setAddress(adminStore.getAddress());
                adminStoreDetail.setRegion(adminStore.getRegion());
                adminStoreDetail.setTel(adminStore.getTel());
                adminStoreDetail.setHomepage(adminStore.getHomepage());

                adminStoreDtos.add(adminStoreDetail);
            }

            return adminStoreDtos;
        }

    };
}
