package com.aanbari.markdowneditor.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.aanbari.markdowneditor.model.Document;

@Repository
public interface DocumentRepository extends CrudRepository<Document, Integer> {

    List<Document> findAll();
    
}