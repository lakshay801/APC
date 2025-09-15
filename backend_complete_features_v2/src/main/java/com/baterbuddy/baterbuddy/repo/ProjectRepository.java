
package com.baterbuddy.baterbuddy.repo;
import com.baterbuddy.baterbuddy.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByVisibilityOrderByCreatedAtDesc(Project.Visibility visibility);
    List<Project> findByOwnerOrderByCreatedAtDesc(String owner);
    List<Project> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
    List<Project> findByCategoryIgnoreCaseOrderByCreatedAtDesc(String category);
}
