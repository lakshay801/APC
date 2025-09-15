package com.baterbuddy.baterbuddy.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloudName:}") String cloudName,
            @Value("${cloudinary.apiKey:}") String apiKey,
            @Value("${cloudinary.apiSecret:}") String apiSecret) {

        if (!cloudName.isBlank() && !apiKey.isBlank() && !apiSecret.isBlank()) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret
            ));
        } else {
            this.cloudinary = new Cloudinary(System.getenv());
        }
    }

    public Map upload(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto")
        );
    }
}
