package com.baterbuddy.baterbuddy.controller;

import com.baterbuddy.baterbuddy.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    private final CloudinaryService cloudinaryService;

    public UploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

//url dega cloudinary upload ke bd 
    @PostMapping
    public ResponseEntity<?> upload(@RequestPart("file") MultipartFile file) throws Exception {
        Map<?, ?> res = cloudinaryService.upload(file);
        return ResponseEntity.ok(Map.of("url", res.get("secure_url")));
    }
}
