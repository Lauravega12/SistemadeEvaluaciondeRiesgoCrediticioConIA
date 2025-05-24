package com.rc_app.Riesgocrediticio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
@EnableJpaRepositories(basePackages = "com.rc_app.riesgocrediticio.repository")
@SpringBootApplication
public class RiesgocrediticioApplication {

	public static void main(String[] args) {
		SpringApplication.run(RiesgocrediticioApplication.class, args);
	}

}
