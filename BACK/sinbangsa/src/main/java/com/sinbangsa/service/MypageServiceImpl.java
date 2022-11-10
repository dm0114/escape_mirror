package com.sinbangsa.service;


import com.sinbangsa.data.dto.MypageInfoDto;
import com.sinbangsa.data.dto.MypageLikeDto;
import com.sinbangsa.data.dto.MypageMyRoomDto;
import com.sinbangsa.data.dto.MypageReviewDto;
import com.sinbangsa.data.entity.*;
import com.sinbangsa.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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

    public MypageInfoDto getMyPageInfo() {
        LOGGER.info("[MyPageServiceImpl] getMyPageInfo 호출");

        MypageInfoDto mypageInfoDto = new MypageInfoDto();

        //임시
        long userId = (long) 1;
        User userRepo = userRepository.findById(userId);

        mypageInfoDto.setNickname(userRepo.getNickname());
        mypageInfoDto.setGrade(userRepo.getGrade());
        mypageInfoDto.setProfileImg(userRepo.getProfile());

        return mypageInfoDto;
    }


    public List<MypageLikeDto> getLikes() {
        LOGGER.info("[MypageService] getLikes 호출");
        List<MypageLikeDto> likes = new ArrayList<>();

        try {
            // 임시
            User user = userRepository.findById((long) 1);

            List<UserThemeRelation> userThemeRelations = userThemeRelationRepository.findAllByThemeRelationUser(user).orElse(null);
            for (UserThemeRelation userThemeRelation : userThemeRelations) {
                MypageLikeDto mypageLikeDto = new MypageLikeDto();
                Theme theme = userThemeRelation.getUserRelationTheme();
                mypageLikeDto.setThemeId(userThemeRelation.getId());
                mypageLikeDto.setStoreName(theme.getStore().getStoreName());
                mypageLikeDto.setThemeName(theme.getThemeName());
                mypageLikeDto.setThemeImg(theme.getPoster());
                likes.add(mypageLikeDto);
            }


        } catch (Exception e) {
            throw new RuntimeException();
        }

        return likes;
    }

    public List<MypageReviewDto> getReviews() {
        LOGGER.info("[MypageServiceImpl] getReviews 호출");
        List<MypageReviewDto> reviews = new ArrayList<>();

        try {
            //임시
            User user = userRepository.findById((long) 1);
            List<ThemeReview> themeReviewsRepo = themeReviewRepository.findAllByReviewUser(user).orElse(new ArrayList<>());
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
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return reviews;
    }


    public MypageMyRoomDto getMypageMyRooms() {
        LOGGER.info("[MypageServiceImpl] getMypageMyRooms 호출");
        MypageMyRoomDto mypageMyRoomDto = new MypageMyRoomDto();

        try {
            // 임시
            User user = userRepository.findById((long) 1);
            List<MypageMyRoomDto.ReservationDto> reservationsDto = new ArrayList<>();
            List<Reservation> reservationsRepo = reservationRepository.findAllByReservationUser(user);
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
            List<Book> booksRepo = bookRepository.findAllByBookUser(user);
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

        } catch (Exception e) {
            throw new RuntimeException();
        }
        return mypageMyRoomDto;
    }
}
