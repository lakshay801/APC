package com.baterbuddy.baterbuddy.controller;

import com.baterbuddy.baterbuddy.model.ChatMessage;
import com.baterbuddy.baterbuddy.repo.ChatMessageRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageRestController {

    private final ChatMessageRepository repo;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageRestController(ChatMessageRepository repo, SimpMessagingTemplate messagingTemplate) {
        this.repo = repo;
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Get all messages for a specific project, ordered by creation time.
     */
    @GetMapping("/project/{projectId}")
    public List<ChatMessage> getProjectMessages(@PathVariable Long projectId) {
        return repo.findByProjectIdOrderByCreatedAtAsc(projectId);
    }

    /**
     * Get a conversation thread between the logged-in user and another user in a project.
     */
    @GetMapping("/thread")
    public List<ChatMessage> getThread(
            @RequestParam Long projectId,
            @RequestParam String with,
            Authentication auth
    ) {
        String me = auth.getName();
        return repo.findThread(projectId, me, with);
    }

    /**
     * Send a new chat message and notify both sender and recipient.
     */
    @PostMapping
    public ResponseEntity<ChatMessage> send(@Valid @RequestBody ChatMessage msg) {
        ChatMessage saved = repo.save(msg);

        // Send to recipient and sender (private queues)
        messagingTemplate.convertAndSendToUser(msg.getToUser(), "/queue/messages", saved);
        messagingTemplate.convertAndSendToUser(msg.getFromUser(), "/queue/messages", saved);

        return ResponseEntity.ok(saved);
    }
}
