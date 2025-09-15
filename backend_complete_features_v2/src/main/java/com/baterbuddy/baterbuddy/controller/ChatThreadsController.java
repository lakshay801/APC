
package com.baterbuddy.baterbuddy.controller;
import com.baterbuddy.baterbuddy.model.ChatMessage;
import com.baterbuddy.baterbuddy.repo.ChatMessageRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController @RequestMapping("/api/chats") public class ChatThreadsController {
    private final ChatMessageRepository repo;
    public ChatThreadsController(ChatMessageRepository repo) { this.repo = repo; }
    @GetMapping("/user/{username}") public List<Map<String,Object>> threads(@PathVariable String username) {
        List<ChatMessage> all = repo.findByFromUserOrToUserOrderByCreatedAtAsc(username, username);
        Map<Long, Map<String,Object>> map = new LinkedHashMap<>();
        for (ChatMessage m: all) {
            Long pid = m.getProjectId();
            Map<String,Object> t = map.getOrDefault(pid, new HashMap<>());

            t.put("projectId", pid);
            String other = username.equals(m.getFromUser()) ? m.getToUser() : m.getFromUser();
            t.put("otherUser", other);
            t.put("lastMessage", m.getContent());
            map.put(pid, t);
        }
        return new ArrayList<>(map.values());
    }
}
