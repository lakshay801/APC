
package com.baterbuddy.baterbuddy.repo;
import com.baterbuddy.baterbuddy.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByProjectIdOrderByCreatedAtAsc(Long projectId);
    @Query("select c from ChatMessage c where c.projectId = :projectId and ((c.fromUser = :a and c.toUser = :b) or (c.fromUser = :b and c.toUser = :a)) order by c.createdAt asc")
    List<ChatMessage> findThread(@Param("projectId") Long projectId, @Param("a") String a, @Param("b") String b);
    List<ChatMessage> findByFromUserOrToUserOrderByCreatedAtAsc(String from, String to);
}
