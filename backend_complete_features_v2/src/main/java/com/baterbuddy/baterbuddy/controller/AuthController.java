
package com.baterbuddy.baterbuddy.controller;
import com.baterbuddy.baterbuddy.model.UserAccount;
import com.baterbuddy.baterbuddy.repo.UserRepository;
import com.baterbuddy.baterbuddy.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/auth") public class AuthController {
    private final UserRepository userRepository; private final PasswordEncoder passwordEncoder; private final JwtUtil jwtUtil; private final AuthenticationManager authenticationManager;
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository; this.passwordEncoder = passwordEncoder; this.jwtUtil = jwtUtil; this.authenticationManager = authenticationManager;
    }
    @PostMapping("/register") public ResponseEntity<?> register(@Valid @RequestBody UserAccount body) {
        if (userRepository.existsByUsername(body.getUsername()) || userRepository.existsByEmail(body.getEmail())) return ResponseEntity.badRequest().body(Map.of("error","exists"));
        body.setPassword(passwordEncoder.encode(body.getPassword())); userRepository.save(body); return ResponseEntity.ok(Map.of("username", body.getUsername(), "email", body.getEmail()));
    }
    @PostMapping("/login") public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String username = body.get("username"); String password = body.get("password"); authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
        String token = jwtUtil.generateToken(username); return ResponseEntity.ok(Map.of("token", token, "username", username));
    }
}
