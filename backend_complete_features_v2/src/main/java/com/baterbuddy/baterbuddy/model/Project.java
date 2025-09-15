
package com.baterbuddy.baterbuddy.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
@Entity
@Table(name="project")
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @NotBlank @Size(max=150) private String title;
    @NotBlank @Size(max=2000) private String description;
    @Enumerated(EnumType.STRING) private Visibility visibility = Visibility.PRIVATE;
    private boolean negotiationDone = false;
    private String imageUrl;
    @NotBlank @Size(max=50) private String owner;
    private Instant createdAt = Instant.now();
    @Size(max=100) private String category;
    @Size(max=200) private String desiredItem;
    public enum Visibility { PUBLIC, PRIVATE }
    public Project() {}
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getTitle(){return title;} public void setTitle(String title){this.title=title;}
    public String getDescription(){return description;} public void setDescription(String description){this.description=description;}
    public Visibility getVisibility(){return visibility;} public void setVisibility(Visibility visibility){this.visibility=visibility;}
    public boolean isNegotiationDone(){return negotiationDone;} public void setNegotiationDone(boolean negotiationDone){this.negotiationDone=negotiationDone;}
    public String getImageUrl(){return imageUrl;} public void setImageUrl(String imageUrl){this.imageUrl=imageUrl;}
    public String getOwner(){return owner;} public void setOwner(String owner){this.owner=owner;}
    public Instant getCreatedAt(){return createdAt;} public void setCreatedAt(Instant createdAt){this.createdAt=createdAt;}
    public String getCategory(){return category;} public void setCategory(String category){this.category=category;}
    public String getDesiredItem(){return desiredItem;} public void setDesiredItem(String desiredItem){this.desiredItem=desiredItem;}
}
