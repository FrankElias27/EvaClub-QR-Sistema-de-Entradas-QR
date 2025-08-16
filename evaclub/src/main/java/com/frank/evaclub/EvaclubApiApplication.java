package com.frank.evaclub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class EvaclubApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EvaclubApiApplication.class, args);
	}

}
