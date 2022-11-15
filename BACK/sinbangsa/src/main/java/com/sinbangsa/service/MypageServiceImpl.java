package com.sinbangsa.service;


import com.sinbangsa.data.dto.*;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import com.sinbangsa.exception.AccessDeniedException;
import com.sinbangsa.utils.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {

    private final Logger LOGGER = LoggerFactory.getLogger(MypageServiceImpl.class);

    private final UserRepository userRepository;

    private final UserThemeRelationRepository userThemeRelationRepository;

    private final ThemeReviewRepository themeReviewRepository;

    private final ReservationRepository reservationRepository;

    private final BookRepository bookRepository;

    private final JwtTokenProvider jwtTokenProvider;

    public MypageInfoDto getMyPageInfo(HttpServletRequest httpServletRequest) {
        LOGGER.info("[MyPageServiceImpl] getMyPageInfo 호출");
        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(token);

        MypageInfoDto mypageInfoDto = new MypageInfoDto();
        try {
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            mypageInfoDto.setNickname(userRepo.getNickname());
            mypageInfoDto.setGrade(userRepo.getGrade());
            mypageInfoDto.setProfileImg(userRepo.getProfile());
            return mypageInfoDto;
        } catch (Exception e) {
            throw e;
        }

    }


    public List<MypageLikeDto> getLikes(int page, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageService] getLikes 호출");
        List<MypageLikeDto> likes = new ArrayList<>();
        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(token);

        try {
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            PageRequest pageRequest = PageRequest.of(page,18);

            List<UserThemeRelation> userThemeRelations = userThemeRelationRepository.findAllByThemeRelationUser(userRepo,pageRequest);
            for (UserThemeRelation userThemeRelation : userThemeRelations) {
                MypageLikeDto mypageLikeDto = new MypageLikeDto();
                Theme theme = userThemeRelation.getUserRelationTheme();
                mypageLikeDto.setThemeId(userThemeRelation.getId());
                mypageLikeDto.setStoreName(theme.getStore().getStoreName());
                mypageLikeDto.setThemeName(theme.getThemeName());
                mypageLikeDto.setThemeImg(theme.getPoster());
                likes.add(mypageLikeDto);
            }
            return likes;
        } catch (Exception e) {
            throw e;
        }

    }

    public List<MypageReviewDto> getReviews(int page, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageServiceImpl] getReviews 호출");
        List<MypageReviewDto> reviews = new ArrayList<>();

        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(token);

        try {
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            PageRequest pageRequest = PageRequest.of(page, 5);
            List<ThemeReview> themeReviewsRepo = themeReviewRepository.findAllByReviewUser(userRepo, pageRequest);
            for (ThemeReview themeReviewRepo : themeReviewsRepo) {
                MypageReviewDto mypageReviewDto = new MypageReviewDto();
                mypageReviewDto.setReviewId(themeReviewRepo.getId());
                mypageReviewDto.setThemeTitle(themeReviewRepo.getReviewTheme().getThemeName());
                mypageReviewDto.setContent(themeReviewRepo.getContent());
                mypageReviewDto.setStar(themeReviewRepo.getStar());
                mypageReviewDto.setDiff(themeReviewRepo.getDiff());
                mypageReviewDto.setStory(themeReviewRepo.getStory());
                mypageReviewDto.setInterior(themeReviewRepo.getInterior());
                mypageReviewDto.setHorror(themeReviewRepo.getHorror());
                mypageReviewDto.setLock(themeReviewRepo.getLocker());
                mypageReviewDto.setReviewImg(themeReviewRepo.getImageUrl());
                reviews.add(mypageReviewDto);
            }
            return reviews;
        } catch (Exception e) {
            throw e;
        }


    }


    public MypageMyRoomDto getMypageMyRooms(HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageServiceImpl] getMypageMyRooms 호출");
        MypageMyRoomDto mypageMyRoomDto = new MypageMyRoomDto();
        String token = jwtTokenProvider.resolveToken(httpServletRequest);
        Long userId = jwtTokenProvider.getUserId(token);

        try {
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            List<MypageMyRoomDto.ReservationDto> reservationsDto = new ArrayList<>();
            List<Reservation> reservationsRepo = reservationRepository.findAllByReservationUser(userRepo);
            for (Reservation reservationRepo : reservationsRepo) {
                MypageMyRoomDto.ReservationDto reservationDto = new MypageMyRoomDto.ReservationDto();
                reservationDto.setReservationId(reservationRepo.getReservationId());

                Theme themeRepo = reservationRepo.getThemeTime().getTheme();
                reservationDto.setThemeName(themeRepo.getThemeName());
                reservationDto.setStoreName(themeRepo.getStore().getStoreName());
                reservationDto.setDate(reservationRepo.getDate());
                reservationDto.setReservatedTime(reservationRepo.getThemeTime().getTime());
                reservationsDto.add(reservationDto);
            }
            mypageMyRoomDto.setReservations(reservationsDto);

            List<MypageMyRoomDto.PlayedRoomDto> playedRoomsDto = new ArrayList<>();
            List<Book> booksRepo = bookRepository.findAllByBookUser(userRepo);
            for (Book bookRepo : booksRepo) {
                MypageMyRoomDto.PlayedRoomDto playedRoomDto = new MypageMyRoomDto.PlayedRoomDto();
                playedRoomDto.setBookId(bookRepo.getId());
                playedRoomDto.setThemeName(bookRepo.getBookTheme().getThemeName());
                playedRoomDto.setStoreName(bookRepo.getBookTheme().getStore().getStoreName());
                playedRoomDto.setIsClear(bookRepo.getClear());
                playedRoomDto.setReview(bookRepo.getReview());
                playedRoomDto.setDoneDate(bookRepo.getDoneDate());
                playedRoomDto.setUsedHint(bookRepo.getUsedHint());
                playedRoomDto.setClearTime(bookRepo.getClearTime());
                playedRoomsDto.add(playedRoomDto);
            }
            mypageMyRoomDto.setBooks(playedRoomsDto);
            return mypageMyRoomDto;
        } catch (Exception e) {
            throw e;
        }

    }

    public void updateUserInfo(UpdateUserInfoRequestDto updateUserInfoRequestDto, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageServiceImpl] updateUserInfo 호출");
        try {
            String apptoken = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(apptoken);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            if (updateUserInfoRequestDto.getUserId() == userId) {
                userRepo.update(updateUserInfoRequestDto.getNickname(), updateUserInfoRequestDto.getProfileImg());
            } else {
                throw new Exception("유저 정보 불일치");
            }

        } catch (Exception e) {
        }
    }

    public ReservationDetailDto getReservationDetail(Long reservationId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageServiceImpl] getReservationDetail 호출");
        try {
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }
            Reservation reservationRepo = reservationRepository.findByReservationId(reservationId).orElse(null);
            if (reservationRepo == null) {
                throw new NullPointerException("예약 정보가 잘못되었습니다.");
            }

            Theme themeRepo = reservationRepo.getThemeTime().getTheme();
            Store storeRepo = themeRepo.getStore();
            ReservationDetailDto reservationDetailDto = new ReservationDetailDto();
            reservationDetailDto.setStoreAddress(storeRepo.getAddress());
            reservationDetailDto.setThemeName(themeRepo.getThemeName());
            reservationDetailDto.setStoreName(storeRepo.getStoreName());
            reservationDetailDto.setDate(reservationRepo.getDate());
            reservationDetailDto.setTime(reservationRepo.getThemeTime().getTime());
            reservationDetailDto.setTel(storeRepo.getTel());
            reservationDetailDto.setHomepage(storeRepo.getHomepage());
            reservationDetailDto.setMapY(storeRepo.getMapY());
            reservationDetailDto.setMapX(storeRepo.getMapX());
            reservationDetailDto.setThemeImg(themeRepo.getPoster());
            return reservationDetailDto;
        } catch (Exception e) {
            throw e;
        }
    }
    @Transactional
    public boolean doTransfer(Long reservationId, HttpServletRequest httpServletRequest) {
        LOGGER.info("[MypageServiceImpl] doTransfer 호출");
        final int TRANSFER_STATE =1;
        try {
            String token = jwtTokenProvider.resolveToken(httpServletRequest);
            Long userId = jwtTokenProvider.getUserId(token);
            User userRepo = userRepository.findById(userId).orElse(null);
            if (userRepo == null) {
                throw new NullPointerException("유저 정보가 잘못되었습니다.");
            }

            Reservation reservationRepo = reservationRepository.findByReservationId(reservationId).orElse(null);

            if (reservationRepo == null) {
                throw new NullPointerException("예약 정보가 잘못되었습니다.");
            }
            if (reservationRepo.getReservationUser() != userRepo) {
                throw new AccessDeniedException("유저정보와 요청유저가 일치하지않습니다.");
            }
            reservationRepo.update(TRANSFER_STATE);
            return true;
        } catch (Exception e) {
            throw e;
        }
    }

}
