package com.persona.metropolitan.metropolitandemo.repository;

import com.persona.metropolitan.metropolitandemo.model.FacturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<FacturaEntity, Integer> {
}
