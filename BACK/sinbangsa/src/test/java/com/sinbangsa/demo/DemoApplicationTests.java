package com.sinbangsa.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {

		LocalDate date = LocalDate.now();
		assertThat(date).isEqualTo(LocalDate.parse("2022-11-11", DateTimeFormatter.ISO_DATE));

	}

}
