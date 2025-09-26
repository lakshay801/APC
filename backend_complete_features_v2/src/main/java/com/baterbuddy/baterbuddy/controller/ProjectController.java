package com.baterbuddy.baterbuddy.controller;

import com.baterbuddy.baterbuddy.model.Project;
import com.baterbuddy.baterbuddy.repo.ProjectRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
    }

    /**
     * Get all public projects.
     */
    @GetMapping("/public")
    public List<Project> publicProjects() {
        return repo.findByVisibilityOrderByCreatedAtDesc(Project.Visibility.PUBLIC);
    }

    /**
     * Get projects owned by the logged-in user.
     */
    @GetMapping("/mine")
    public List<Project> myProjects(Authentication authentication) {
        String owner = authentication.getName();
        return repo.findByOwnerOrderByCreatedAtDesc(owner);
    }

    /**
     * Get projects by a specific owner.
     */
    @GetMapping("/mine/{owner}")
    public List<Project> myProjectsByOwner(@PathVariable String owner) {
        return repo.findByOwnerOrderByCreatedAtDesc(owner);
    }

    /**
     * Search projects by query or category.
     */
    @GetMapping("/search")
    public List<Project> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category
    ) {
        if (category != null && !category.isBlank()) {
            return repo.findByCategoryIgnoreCaseOrderByCreatedAtDesc(category);
        }
        if (q != null && !q.isBlank()) {
            return repo.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
        }
        return repo.findByVisibilityOrderByCreatedAtDesc(Project.Visibility.PUBLIC);
    }

    /**
     * Get a single project by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getOne(@PathVariable Long id) {
        return repo.findById(id)
                   .map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    //naya product
    @PostMapping
    public ResponseEntity<Project> create(@Valid @RequestBody Project p, Authentication auth) {
        p.setOwner(auth.getName());
        return ResponseEntity.ok(repo.save(p));
    }

    //updation h 
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Project p, Authentication auth) {
        return repo.findById(id).map(existing -> {
            if (!existing.getOwner().equals(auth.getName())) {
                return ResponseEntity.status(403).body("Forbidden: not owner");
            }
            existing.setTitle(p.getTitle());
            existing.setDescription(p.getDescription());
            existing.setDesiredItem(p.getDesiredItem());
            existing.setCategory(p.getCategory());
            existing.setVisibility(p.getVisibility());
            existing.setImageUrl(p.getImageUrl());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    //visibility--
    @PutMapping("/{id}/visibility")
    public ResponseEntity<?> setVisibility(@PathVariable Long id, @RequestParam("v") String v, Authentication auth) {
        return repo.findById(id).map(p -> {
            if (!p.getOwner().equals(auth.getName())) {
                return ResponseEntity.status(403).body("Forbidden");
            }
            p.setVisibility(Project.Visibility.valueOf(v));
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

        //working---
    @PutMapping("/{id}/negotiation-done")
    public ResponseEntity<?> markNegotiationDone(@PathVariable Long id, Authentication auth) {
        return repo.findById(id).map(p -> {
            if (!p.getOwner().equals(auth.getName())) {
                return ResponseEntity.status(403).body("Forbidden");
            }
            p.setNegotiationDone(true);
            return ResponseEntity.ok(repo.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

   //delete wali query h 
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        return repo.findById(id).map(p -> {
            if (!p.getOwner().equals(auth.getName())) {
                return ResponseEntity.status(403).body("Forbidden: only owner can delete");
            }
            repo.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
