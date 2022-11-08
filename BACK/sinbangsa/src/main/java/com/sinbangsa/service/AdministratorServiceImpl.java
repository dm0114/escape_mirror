package com.sinbangsa.service;

import com.sinbangsa.data.dto.AdminStoreDto;
import com.sinbangsa.data.dto.StoreRegesterDto;
import com.sinbangsa.data.entity.Admin;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.repository.AdministratorRepository;
import com.sinbangsa.data.repository.StoreRepository;
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
    private final StoreRepository storeRepository;

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

    public Boolean registerStoreDetail(StoreRegesterDto storeRegesterDto, Long adminId){
        LOGGER.info("[AdministratorService] registerStoreDetail 호출");
        // admin token 발급 후 수정 필요
        Admin admin = administratorRepository.getAdminById(adminId).orElse(null);
        Store newStore = new Store();

        try {
            newStore.setStoreAdmin(admin);
            newStore.setStoreName(storeRegesterDto.getStoreName());
            newStore.setAddress(storeRegesterDto.getAddress());
            newStore.setTel(storeRegesterDto.getTel());
            newStore.setRegion(storeRegesterDto.getRegion());
            newStore.setHomepage(storeRegesterDto.getHomepage());
            newStore.setStoreId(storeRepository.getNewStoreId());
            newStore.setPoster(storeRegesterDto.getStoreImg());

            // DB 지우고 다시 데이터 넣고 돌릴 때 지울부분(not null 옵션 때문에...)
            newStore.setMapX("123");
            newStore.setMapY("sdf");
            //------------------------

            storeRepository.save(newStore);
            LOGGER.info("[AdministratorService] 저장 됨");
            return true;
        } catch(Exception e){
           return false;
        }

    };
}
