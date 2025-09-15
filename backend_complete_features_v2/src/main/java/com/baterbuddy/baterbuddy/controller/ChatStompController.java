
package com.baterbuddy.baterbuddy.controller;
import com.baterbuddy.baterbuddy.model.ChatMessage;
import com.baterbuddy.baterbuddy.repo.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
@Controller public class ChatStompController {
    private final ChatMessageRepository repo;
    @Autowired private SimpMessagingTemplate messagingTemplate;
    public ChatStompController(ChatMessageRepository repo) { this.repo = repo; }
    @MessageMapping("/chat") public void process(ChatMessage message) {
        ChatMessage saved = repo.save(message);
        messagingTemplate.convertAndSendToUser(saved.getToUser(), "/queue/messages", saved);
        messagingTemplate.convertAndSendToUser(saved.getFromUser(), "/queue/messages", saved);
    }
}
