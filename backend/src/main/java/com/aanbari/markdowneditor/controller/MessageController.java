package com.aanbari.markdowneditor.controller;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/message") // Matches the destination prefix
    @SendTo("/topic/messages") // Broadcast to subscribers
    public Message sendMessage(Message message) {
        System.out.println("Received message: " + message);
        return message; // Return the message to be broadcast
    }
}

@Getter
@Setter
@NoArgsConstructor
class Message {
    private String sender;
    private String content;
    private String title;
}
