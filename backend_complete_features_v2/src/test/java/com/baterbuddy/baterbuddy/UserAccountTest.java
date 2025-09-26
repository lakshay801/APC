package com.baterbuddy.baterbuddy;

import com.baterbuddy.baterbuddy.model.UserAccount;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for UserAccount model
 */
class UserAccountTest {

    private UserAccount userAccount;

    @BeforeEach
    void setUp() {
        userAccount = new UserAccount();
    }

    @Test
    @DisplayName("Should create UserAccount with valid data")
    void testUserAccountCreation() {
        // Arrange
        String expectedUsername = "testuser";
        String expectedEmail = "test@example.com";
        String expectedPassword = "password123";

        // Act
        userAccount.setUsername(expectedUsername);
        userAccount.setEmail(expectedEmail);
        userAccount.setPassword(expectedPassword);

        // Assert
        assertEquals(expectedUsername, userAccount.getUsername());
        assertEquals(expectedEmail, userAccount.getEmail());
        assertEquals(expectedPassword, userAccount.getPassword());
        assertNull(userAccount.getId()); // ID should be null before persistence
    }

    @Test
    @DisplayName("Should create UserAccount using constructor")
    void testUserAccountConstructor() {
        // Arrange & Act
        UserAccount user = new UserAccount("john_doe", "john@example.com", "securepass");

        // Assert
        assertEquals("john_doe", user.getUsername());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("securepass", user.getPassword());
        assertNull(user.getId());
    }

    @Test
    @DisplayName("Should handle toString method correctly")
    void testToString() {
        // Arrange
        userAccount.setId(1L);
        userAccount.setUsername("testuser");
        userAccount.setEmail("test@example.com");
        userAccount.setPassword("password123");

        // Act
        String result = userAccount.toString();

        // Assert
        assertTrue(result.contains("testuser"));
        assertTrue(result.contains("test@example.com"));
        assertTrue(result.contains("password123"));
        assertTrue(result.contains("id=1"));
    }

    @Test
    @DisplayName("Should handle null values gracefully")
    void testNullValues() {
        // Act & Assert
        assertNull(userAccount.getUsername());
        assertNull(userAccount.getEmail());
        assertNull(userAccount.getPassword());
        assertNull(userAccount.getId());
    }

    @Test
    @DisplayName("Should allow setting ID")
    void testSetId() {
        // Arrange
        Long expectedId = 42L;

        // Act
        userAccount.setId(expectedId);

        // Assert
        assertEquals(expectedId, userAccount.getId());
    }
}