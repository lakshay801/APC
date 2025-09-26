package com.baterbuddy.baterbuddy.repo;

import com.baterbuddy.baterbuddy.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // ---------- Simple finder by project ID ----------
    List<ChatMessage> findByProjectIdOrderByCreatedAtAsc(Long projectId);

    // ---------- Custom query for a conversation thread between two users ----------
    @Query("""
           SELECT c
           FROM ChatMessage c
           WHERE c.projectId = :projectId
             AND (
                   (c.fromUser = :a AND c.toUser = :b)
                OR (c.fromUser = :b AND c.toUser = :a)
                 )
           ORDER BY c.createdAt ASC
           """)
    List<ChatMessage> findThread(@Param("projectId") Long projectId,
                                 @Param("a") String a,
                                 @Param("b") String b);

    // ---------- Find all messages sent or received by a user ----------
    List<ChatMessage> findByFromUserOrToUserOrderByCreatedAtAsc(String from, String to);
}
