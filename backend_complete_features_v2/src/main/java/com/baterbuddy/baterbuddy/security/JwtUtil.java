package com.baterbuddy.baterbuddy.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/**
 * Utility class for generating, parsing, and validating JWT tokens.
 */
@Component
public class JwtUtil {

    // ---------- Fields ----------
    private final Key key;            // Secret key for signing tokens
    private final long expirationMs;  // Token expiration time in milliseconds

    // ---------- Constructor ----------
    public JwtUtil(@Value("${jwt.secret}") String secret,
                   @Value("${jwt.expirationMs}") long expirationMs) {

        // Convert secret to a secure signing key
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMs = expirationMs;
    }

    // ---------- Generate JWT Token ----------
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .setSubject(username)         // store username in token
                .setIssuedAt(now)             // issued time
                .setExpiration(expiryDate)    // expiration time
                .signWith(key, SignatureAlgorithm.HS256) // sign with secret key
                .compact();
    }

    // ---------- Extract Username from JWT ----------
    public String getUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ---------- Validate JWT Token ----------
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token); // throws if token invalid/expired
            return true;
        } catch (JwtException ex) {
            return false;
        }
    }
}
