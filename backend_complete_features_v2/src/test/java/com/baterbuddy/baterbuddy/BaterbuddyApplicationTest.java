package com.baterbuddy.baterbuddy;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/**
 * Integration test to verify Spring Boot application context loads successfully
 */
@SpringBootTest
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.datasource.driverClassName=org.h2.Driver",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "jwt.secret=testsecretkeythatislongenoughforjwttesting123456789",
    "jwt.expirationMs=3600000"
})
class BaterbuddyApplicationTest {

    @Test
    void contextLoads() {
        // This test will pass if the Spring application context loads successfully
        // It's a smoke test to ensure all beans are properly configured
    }
}