package com.aanbari.markdowneditor.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aanbari.markdowneditor.model.Document;
import com.aanbari.markdowneditor.repository.DocumentRepository;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    
    @Autowired
    DocumentRepository documentRepository;

    @GetMapping
    public List<Document> getAllDocuments(){
        
        return documentRepository.findAll();
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Document> findDocumentById(@PathVariable("id") int id){
        
        return documentRepository.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public Document createDocument(@RequestBody Document document){
        Document newDocument = new Document(document.getTitle(), document.getContent(), LocalDateTime.now());
        return documentRepository.save(newDocument);
    }
}
