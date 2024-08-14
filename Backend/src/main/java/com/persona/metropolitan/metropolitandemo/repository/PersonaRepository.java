package com.persona.metropolitan.metropolitandemo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.persona.metropolitan.metropolitandemo.model.PersonaEntity;

public interface PersonaRepository extends JpaRepository<PersonaEntity, Integer> {
}
