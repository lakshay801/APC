
package com.baterbuddy.baterbuddy.service;
import com.baterbuddy.baterbuddy.model.UserAccount;
import com.baterbuddy.baterbuddy.repo.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository repo;
    public CustomUserDetailsService(UserRepository repo) { this.repo = repo; }
    @Override public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount ua = repo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return User.withUsername(ua.getUsername()).password(ua.getPassword()).authorities("USER").build();
    }
}
