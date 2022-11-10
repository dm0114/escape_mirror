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
import com.sinbangsa.exception.StoreNotFoundException;
import com.sinbangsa.exception.ThemeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

    public Boolean registerStoreDetail(StoreRegisterDto storeRegisterDto, long adminId){
        LOGGER.info("[AdministratorService] registerStoreDetail 호출");
        // admin token 발급 후 수정 필요
        Admin admin = administratorRepository.getAdminById(adminId).orElse(null);
        Store newStore = new Store();

        try {
            newStore.setStoreAdmin(admin);
            newStore.setStoreName(storeRegisterDto.getStoreName());
            newStore.setAddress(storeRegisterDto.getAddress());
            newStore.setTel(storeRegisterDto.getTel());
            newStore.setRegion(storeRegisterDto.getRegion());
            newStore.setHomepage(storeRegisterDto.getHomepage());
            newStore.setStoreId(storeRepository.getNewStoreId());
            newStore.setPoster(storeRegisterDto.getStoreImg());

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

    @Transactional
    public Boolean registerThemeThemeTime(ThemeRegisterDto themeRegisterDto, long adminId){
        LOGGER.info("[AdministratorService] registerTheme 호출");

        // orElse 붙이기(null 처리)
        Store store = storeRepository.findByStoreId(themeRegisterDto.getStoreId());
        if (store == null) {
            throw new StoreNotFoundException();
        }

        if (adminId != storeRepository.findByStoreId(themeRegisterDto.getStoreId()).getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }
        Long createdThemeId = registerTheme(themeRegisterDto);
        Boolean result = registerThemeTime(themeRegisterDto.getReservationtime(), createdThemeId);

        return result;
    }

    public Long registerTheme(ThemeRegisterDto themeRegister){
        LOGGER.info("[AdministratorService] registerTheme 호출");
        Store store = storeRepository.findByStoreId(themeRegister.getStoreId());
        Theme newTheme = new Theme();
        try {
            newTheme.setStore(store);
            newTheme.setThemeName(themeRegister.getThemeTitle());
            newTheme.setGenre(themeRegister.getGenre());
            newTheme.setDescription(themeRegister.getContent());
            newTheme.setLeadtime(themeRegister.getLeadtime());
            newTheme.setDifficulty(themeRegister.getDifficulty());
            newTheme.setCapacity(themeRegister.getCapacity());
            newTheme.setPrice(themeRegister.getPrice());
            newTheme.setPoster(themeRegister.getThemeImg());


            long newId = themeRepository.getNewId(store.getStoreId());
            if (newId == 0) {
                newId = store.getStoreId()*100+1;
            } else {
                newId = themeRepository.getNewId(store.getStoreId()) + 1;
            }
            newTheme.setId(newId);

            Theme savedTheme = themeRepository.save(newTheme);
            LOGGER.info("[registerTheme] 저장 됨 {}",savedTheme.getId());
            return savedTheme.getId();

        }catch (Exception e){
            return (long)0;
        }
    }

    public Boolean registerThemeTime(List<String> themeTimes, long createdThemeId){
        LOGGER.info("[AdministratorService] registerThemeTime 호출");
        List<ThemeTime> timeList = new ArrayList<>();

        try{
            int cnt = 1;
            for (String themeTime : themeTimes) {
                ThemeTime createThemeTime = new ThemeTime();
                createThemeTime.setTheme(themeRepository.findById(createdThemeId));
                createThemeTime.setTime(themeTime);

                long newId = createdThemeId*100+cnt;

                createThemeTime.setId(newId);

                timeList.add(createThemeTime);
                cnt += 1;
            }

        }catch (Exception e){
            return false;
        }
        for (ThemeTime themeTime : timeList) {
            themeTimeRepository.save(themeTime);
        }
        LOGGER.info("[registerThemeTime] 저장 됨");
        return true;
    }

    @Transactional
    public Boolean updateThemeThemeTime(ThemeUpdateDto themeUpdateDto, long adminId){
        LOGGER.info("[AdministratorService] updateThemeThemeTime 호출");

        Theme theme = themeRepository.getById(themeUpdateDto.getThemeId()).orElse(null);
        if (theme == null) {
            throw new ThemeNotFoundException();
        }
        if (adminId != theme.getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            theme.setThemeName(themeUpdateDto.getThemeTitle());
            theme.setGenre(themeUpdateDto.getGenre());
            theme.setDescription(themeUpdateDto.getContent());
            theme.setLeadtime(themeUpdateDto.getLeadtime());
            theme.setCapacity(themeUpdateDto.getCapacity());
            theme.setPrice(themeUpdateDto.getPrice());
            theme.setPoster(themeUpdateDto.getThemeImg());

            themeRepository.save(theme);
            LOGGER.info("[updateThemeDetail] 수정 됨");
            return true;

        }catch (Exception e) {
            return false;
        }


    }

    public Boolean createThemeTime(long themeId, String themeTime, long adminId){
        LOGGER.info("[AdministratorService] updateThemeThemeTime 호출");
        ThemeTime createdThemeTime = new ThemeTime();
        Theme theme = themeRepository.getById(themeId).orElse(null);
        if (theme == null) {
            throw new ThemeNotFoundException();
        }
        if (adminId != theme.getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            createdThemeTime.setTheme(themeRepository.getById(themeId).orElse(null));
            long createdThemeTimeId = themeTimeRepository.getNewId(themeId);
            if (createdThemeTimeId == 0) {
                createdThemeTimeId = themeId*100+1;
            }else {
                createdThemeTimeId += 1;
            }
            createdThemeTime.setId(createdThemeTimeId);
            createdThemeTime.setTime(themeTime);

            themeTimeRepository.save(createdThemeTime);
            LOGGER.info("[createThemeTime] 추가 됨");
            return true;

        }catch (Exception e){
            return false;
        }

    }


}
