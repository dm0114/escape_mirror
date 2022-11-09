package com.sinbangsa.service;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.Admin;
import com.sinbangsa.data.entity.Store;
import com.sinbangsa.data.entity.Theme;
import com.sinbangsa.data.entity.ThemeTime;
import com.sinbangsa.data.repository.AdministratorRepository;
import com.sinbangsa.data.repository.StoreRepository;
import com.sinbangsa.data.repository.ThemeRepository;
import com.sinbangsa.data.repository.ThemeTimeRepository;
import com.sinbangsa.exception.AccessDeniedException;
import com.sinbangsa.exception.ThemeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdministratorServiceImpl implements AdministratorService {
    private final Logger LOGGER = LoggerFactory.getLogger(AdministratorServiceImpl.class);
    private final AdministratorRepository administratorRepository;
    private final StoreRepository storeRepository;
    private final ThemeRepository themeRepository;
    private final ThemeTimeRepository themeTimeRepository;

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
                adminStoreDetail.setStoreId(adminStore.getStoreId());
                adminStoreDetail.setStoreImg(adminStore.getPoster());
                adminStoreDetail.setAddress(adminStore.getAddress());
                adminStoreDetail.setRegion(adminStore.getRegion());
                adminStoreDetail.setTel(adminStore.getTel());
                adminStoreDetail.setHomepage(adminStore.getHomepage());
                adminStoreDetail.setStoreName(adminStore.getStoreName());
                adminStoreDtos.add(adminStoreDetail);
            }

            return adminStoreDtos;
        }

    };

    public Boolean registerStoreDetail(StoreRegesterDto storeRegesterDto, long adminId){
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

    public Boolean updateStoreDetail(AdminStoreDto adminStoreDto, long adminId){
        LOGGER.info("[AdministratorService] updateStoreDetail 호출");

        Store updateStore = storeRepository.findByStoreId(adminStoreDto.getStoreId());

        if (adminId != updateStore.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            updateStore.setStoreName(adminStoreDto.getStoreName());
            updateStore.setPoster(adminStoreDto.getStoreImg());
            updateStore.setAddress(adminStoreDto.getAddress());
            updateStore.setRegion(adminStoreDto.getRegion());
            updateStore.setTel(adminStoreDto.getTel());
            updateStore.setHomepage(adminStoreDto.getHomepage());

            storeRepository.save(updateStore);
            LOGGER.info("[updateStoreDetail] 수정 됨");
            return true;

        } catch (Exception e) {
            return false;
        }

    };

    public List<ThemeListDto> getThemeList(long storeId, long adminId){
        LOGGER.info("[AdministratorService] getThemeList 호출");
        Store store = storeRepository.findByStoreId(storeId);

        if (adminId != store.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        List<Theme> themeList = store.getThemes();
        List<ThemeListDto> themeListDtoList = new ArrayList<>();
        for (Theme theme : themeList) {
            ThemeListDto gTheme = new ThemeListDto();
            gTheme.setThemeId(theme.getId());
            gTheme.setThemeTitle(theme.getThemeName());
            gTheme.setThemeImg(theme.getPoster());

            themeListDtoList.add(gTheme);
        }

        if (themeListDtoList.size() == 0) {
            throw new ThemeNotFoundException();
        }else {
            return themeListDtoList;
        }

    }

    public AdministratorThemeDetailDto getThemeDetail(long themeId, long adminId){
        LOGGER.info("[AdministratorService] getThemeDetail 호출");
        Theme theme = themeRepository.getById(themeId).orElse(null);
        // 토큰 넣고 주석 부분 바꾸기
//        if (adminId != theme.getStore().getStoreAdmin().getId()) {
//            throw new AccessDeniedException();
//        }
        if (theme==null) {
            throw new ThemeNotFoundException();
        }

        AdministratorThemeDetailDto themeDetail = new AdministratorThemeDetailDto();
        themeDetail.setThemeTitle(theme.getThemeName());
        themeDetail.setGenre(theme.getGenre());
        themeDetail.setContent(theme.getDescription());
        themeDetail.setLeadtime(theme.getLeadtime());
        themeDetail.setCapacity(theme.getCapacity());
        themeDetail.setPrice(theme.getPrice());
        themeDetail.setThemeImg(theme.getPoster());
        themeDetail.setDifficaulty(theme.getDifficulty());
        List<ThemeTime> themeTimes = theme.getThemeTimes();
        List<ThemeTimeDto> themeTimeDto = new ArrayList<>();
        for (ThemeTime themeTime : themeTimes ){
            ThemeTimeDto tTime = new ThemeTimeDto();
            tTime.setThemeTimeId(themeTime.getId());
            tTime.setTime(themeTime.getTime());
            themeTimeDto.add(tTime);
        }
        themeDetail.setReservationtime(themeTimeDto);

        return themeDetail;

    };

}
