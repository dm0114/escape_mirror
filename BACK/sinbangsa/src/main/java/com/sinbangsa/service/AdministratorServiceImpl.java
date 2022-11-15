package com.sinbangsa.service;

import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import com.sinbangsa.exception.*;
import jdk.vm.ci.meta.Local;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdministratorServiceImpl implements AdministratorService {
    private final Logger LOGGER = LoggerFactory.getLogger(AdministratorServiceImpl.class);
    private final StoreRepository storeRepository;
    private final ThemeRepository themeRepository;
    private final ThemeTimeRepository themeTimeRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public List<AdminStoreDto> getAdminStoreDetail(long adminId){
        LOGGER.info("[AdministratorService] getAdminStoreDetail 호출");
        User admin = userRepository.findById(adminId).orElse(null);
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
        User admin = userRepository.findById(adminId).orElse(null);

        try {
            Store newStore = Store.builder()
                    .storeId(storeRepository.getNewStoreId())
                    .storeAdmin(admin)
                    .storeName(storeRegisterDto.getStoreName())
                    .tel(storeRegisterDto.getTel())
                    .address(storeRegisterDto.getAddress())
                    .region(storeRegisterDto.getRegion())
                    .homepage(storeRegisterDto.getHomepage())
                    .poster(storeRegisterDto.getStoreImg())
                    .build();

            storeRepository.save(newStore);
            LOGGER.info("[AdministratorService] 저장 됨");
            return true;
        } catch(Exception e){
           return false;
        }

    };

    public Boolean updateStoreDetail(AdminStoreDto adminStoreDto, long adminId){
        LOGGER.info("[AdministratorService] updateStoreDetail 호출");

        Store updateStore = storeRepository.findByStoreId(adminStoreDto.getStoreId()).orElse(null);

        if(updateStore == null) {
            throw new StoreNotFoundException();
        }

        if (adminId != updateStore.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            updateStore.update(adminStoreDto.getStoreName(),
                    adminStoreDto.getAddress(),
                    adminStoreDto.getTel(),
                    adminStoreDto.getStoreImg(),
                    adminStoreDto.getHomepage(),
                    adminStoreDto.getRegion()
                    );

            storeRepository.save(updateStore);
            LOGGER.info("[updateStoreDetail] 수정 됨");
            return true;

        } catch (Exception e) {
            return false;
        }

    };

    public List<ThemeListDto> getThemeList(long storeId, long adminId){
        LOGGER.info("[AdministratorService] getThemeList 호출");
        Store store = storeRepository.findByStoreId(storeId).orElse(null);

        if (adminId != store.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }
        if(store == null) {
            throw new StoreNotFoundException();
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
//         토큰 넣고 주석 부분 바꾸기
        if (adminId != theme.getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }
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
        Store store = storeRepository.findByStoreId(themeRegisterDto.getStoreId()).orElse(null);
        if (store == null) {
            throw new StoreNotFoundException();
        }

        if (adminId != store.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }
        Long createdThemeId = registerTheme(themeRegisterDto);
        Boolean result = registerThemeTime(themeRegisterDto.getReservationtime(), createdThemeId);

        return result;
    }

    public Long registerTheme(ThemeRegisterDto themeRegister){
        LOGGER.info("[AdministratorService] registerTheme 호출");
        Store store = storeRepository.findByStoreId(themeRegister.getStoreId()).orElse(null);

        if(store == null) {
            throw new StoreNotFoundException();
        }
        try {
            long newId = themeRepository.getNewId(store.getStoreId());
            if (newId == 0) {
                newId = store.getStoreId()*100+1;
            } else {
                newId = themeRepository.getNewId(store.getStoreId()) + 1;
            }

            Theme newTheme = Theme.builder()
                    .id(newId)
                    .themeName(themeRegister.getThemeTitle())
                    .capacity(themeRegister.getCapacity())
                    .genre(themeRegister.getGenre())
                    .price(themeRegister.getPrice())
                    .difficulty(themeRegister.getDifficulty())
                    .poster(themeRegister.getThemeImg())
                    .leadtime(themeRegister.getLeadtime())
                    .description(themeRegister.getContent())
                    .store(store)
                    .build();

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
                long newId = createdThemeId*100+cnt;
                Theme themeRepo = themeRepository.findById(createdThemeId).orElse(null);
                if (themeRepo == null) {
                    throw new ThemeNotFoundException();
                }
                ThemeTime createThemeTime = ThemeTime.builder()
                        .time(themeTime)
                        .theme(themeRepo)
                        .id(newId)
                        .build();

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
            theme.update(themeUpdateDto.getThemeTitle(),
                    themeUpdateDto.getGenre(),
                    themeUpdateDto.getCapacity(),
                    themeUpdateDto.getPrice(),
                    themeUpdateDto.getDifficulty(),
                    themeUpdateDto.getLeadtime(),
                    themeUpdateDto.getContent(),
                    themeUpdateDto.getThemeImg()
            );

            themeRepository.save(theme);
            LOGGER.info("[updateThemeDetail] 수정 됨");
            return true;

        }catch (Exception e) {
            return false;
        }


    }

    public Boolean createThemeTime(long themeId, String themeTime, long adminId){
        LOGGER.info("[AdministratorService] createThemeTime 호출");

        Theme theme = themeRepository.getById(themeId).orElse(null);
        if (theme == null) {
            throw new ThemeNotFoundException();
        }
        if (adminId != theme.getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            long createdThemeTimeId = themeTimeRepository.getNewId(themeId);
            if (createdThemeTimeId == 0) {
                createdThemeTimeId = themeId*100+1;
            }else {
                createdThemeTimeId += 1;
            }

            ThemeTime createdThemeTime = ThemeTime.builder()
                    .id(createdThemeTimeId)
                    .theme(theme)
                    .time(themeTime)
                    .build();

            themeTimeRepository.save(createdThemeTime);
            LOGGER.info("[createThemeTime] 추가 됨");
            return true;

        }catch (Exception e){
            return false;
        }

    }

    public Boolean updateThemeTime(ThemeTimeDto themeTime, long adminId){
        LOGGER.info("[AdministratorService] updateThemeTime 호출");
        ThemeTime updateTime = themeTimeRepository.findById(themeTime.getThemeTimeId()).orElse(null);
        if (updateTime == null) {
            throw new ThemeTimeNotFoundException();
        }
        if (adminId != updateTime.getTheme().getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            updateTime.update(themeTime.getTime());

            themeTimeRepository.save(updateTime);
            LOGGER.info("[updateTime] 수정 됨");
            return true;

        }catch (Exception e){
            return false;
        }


    }

    public Boolean deleteThemeTime(long themeTimeId, long adminId){
        LOGGER.info("[AdministratorService] deleteThemeTime 호출");
        ThemeTime themetime = themeTimeRepository.findById(themeTimeId).orElse(null);

        try {
            if (themetime == null) {
                throw new ThemeTimeNotFoundException();
            }

            if (adminId != themetime.getTheme().getStore().getStoreAdmin().getId()) {
                throw new AccessDeniedException();
            }
            themeTimeRepository.delete(themetime);
            return true;
        }catch (Exception e) {
            return false;
        }

    }

    @Transactional
    public Boolean deleteTheme(long themeId, long adminId){
        LOGGER.info("[AdministratorService] deleteTheme 호출");
        Theme theme = themeRepository.getById(themeId).orElse(null);
        if (theme == null) {
            throw new ThemeNotFoundException();
        }
        if (adminId != theme.getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }
        try {
            List<ThemeTime> themeTimeList = themeTimeRepository.findAllByThemeId(themeId);
            for (ThemeTime themeTime : themeTimeList){
                themeTimeRepository.delete(themeTime);
            }

            themeRepository.delete(theme);
            return true;
        }catch (Exception e) {
            return false;
        }


    }

    public List<ReservationCountDto> getReservationCount(long adminId, long storeId){
        LOGGER.info("[AdministratorService] getReservationCount 호출");
        Store store = storeRepository.getByStoreId(storeId).orElse(null);
        if (store == null) {
            throw new StoreNotFoundException();
        }

        if (adminId != store.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }
        List<ReservationCountDto> reservationCountList = new ArrayList<>();
        LocalDate day = LocalDate.now();

        for (int i = 0; i < 7 ; i++ ){
            LocalDate lDay = day.plusDays(i);
            ReservationCountDto reservationCount = new ReservationCountDto();
            reservationCount.setDay(lDay);
            reservationCount.setAcceptedCount(reservationRepository.getCountAccepted(lDay.toString(),store.getStoreId()));
            reservationCount.setWaintCount(reservationRepository.getCountWaiting(lDay.toString(),store.getStoreId()));

            reservationCountList.add(reservationCount);
        }

        return reservationCountList;

    }

    public ReservationAdminDayDto getReservationAdminDay(long storeId, String reservationDay, long adminId){
        LOGGER.info("[AdministratorService] getReservationCount 호출");
        Store store = storeRepository.getByStoreId(storeId).orElse(null);
        if (store == null) {
            throw new StoreNotFoundException();
        }

        if (adminId != store.getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        ReservationAdminDayDto reservationAdminDayDto = new ReservationAdminDayDto();
        reservationAdminDayDto.setStoreName(store.getStoreName());
        List<Theme> themes = store.getThemes();
        if (themes.size() == 0) {
            throw new ThemeNotFoundException();
        }

        List<ReservationAdminDayDto.ThemeReservationDto> themeReservationDtoList = new ArrayList<>();

        for (Theme theme : themes) {
            ReservationAdminDayDto.ThemeReservationDto themeReservationDto = new ReservationAdminDayDto.ThemeReservationDto();
            themeReservationDto.setThemeId(theme.getId());
            themeReservationDto.setThemeName(theme.getThemeName());
            List<ThemeTime> themeTimes = theme.getThemeTimes();
            List<ReservationAdminDayDto.TimeReservationDto> timeReservationDtos = new ArrayList<>();
            for (ThemeTime themeTime : themeTimes) {
                Reservation reservation = reservationRepository.findByDateAndThemeTime(reservationDay, themeTime).orElse(null);
                if (reservation != null) {
                    ReservationAdminDayDto.TimeReservationDto timeReservationDto = new ReservationAdminDayDto.TimeReservationDto();
                    timeReservationDto.setReservationTime(reservation.getThemeTime().getTime());
                    timeReservationDto.setReservationTimeId(reservation.getThemeTime().getId());
                    timeReservationDto.setUserName(reservation.getReservationUser().getNickname());
                    timeReservationDto.setStatus(reservation.getStatus());
                    timeReservationDto.setAccept(reservation.getAccept());
                    timeReservationDtos.add(timeReservationDto);
                }
            }
            themeReservationDto.setTimeReservationDto(timeReservationDtos);
            themeReservationDtoList.add(themeReservationDto);
        }
        reservationAdminDayDto.setThemeReservationList(themeReservationDtoList);
        return reservationAdminDayDto;
    }

    @Transactional
    public Boolean approveReservation(long adminId, long reservationId){
        LOGGER.info("[AdministratorService] approveReservation 호출");
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) {
            throw new ReservationNotFound();
        }

        // admin 안붙어있으면 에러남
        if (adminId != reservation.getThemeTime().getTheme().getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        try {
            reservation.update(true);
            LOGGER.info("[approveReservation] 승인 됨");
            return true;
        } catch(Exception e){
            return false;
        }
    }
    public Boolean deleteReservation(long reservationId, long adminId){
        LOGGER.info("[AdministratorService] deleteReservation 호출");
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);

        try {
            if (reservation == null) {
                throw new ReservationNotFound();
            }

            if (adminId != reservation.getThemeTime().getTheme().getStore().getStoreAdmin().getId()) {
                throw new AccessDeniedException();
            }
            reservationRepository.delete(reservation);
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public Boolean verificationExit(BookRegisterDto bookRegister,long adminId){
        LOGGER.info("[AdministratorService] deleteReservation 호출");
        Theme theme = themeRepository.getById(bookRegister.getThemeId()).orElse(null);
        if (theme == null) {
            throw new ThemeNotFoundException();
        }
        if (adminId != theme.getStore().getStoreAdmin().getId()) {
            throw new AccessDeniedException();
        }

        List<String> userList = bookRegister.getUserNicknames();
        System.out.println(userList.size());
        for (String nickname : userList) {
            User user = userRepository.findByNickname(nickname).orElse(null);
            if (user == null) {
                throw new UserNotFoundException();
            }

            try {
                Book rbook = Book.builder()
                        .bookUser(user)
                        .bookTheme(theme)
                        .clear(bookRegister.getClear())
                        .usedHint(bookRegister.getUsedHint())
                        .clearTime(bookRegister.getClearTime())
                        .doneDate(LocalDate.now())
                        .review(false)
                        .build();
                bookRepository.save(rbook);
            } catch (Exception e) {
                return false;
            }

        }
        Boolean del = deleteReservation(bookRegister.getReservationId(), adminId);
        if (del) {
            return true;
        }else {
            return false;
        }
    }



}
