package com.persona.metropolitan.metropolitandemo.service;

import com.persona.metropolitan.metropolitandemo.model.PersonaEntity;
import com.persona.metropolitan.metropolitandemo.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    public List<PersonaEntity> getAllPersonas() {
        return personaRepository.findAll();
    }

    public PersonaEntity getPersonaById(Integer idpersona) {
        return personaRepository.findById(idpersona).orElse(null);
    }

    public PersonaEntity createPersona(PersonaEntity persona) {
        return personaRepository.save(persona);
    }

    public PersonaEntity updatePersona(Integer idpersona, PersonaEntity updatedPersona) {
        PersonaEntity existingPersona = personaRepository.findById(idpersona).orElse(null);
        if (existingPersona != null) {
            existingPersona.setNombre(updatedPersona.getNombre());
            existingPersona.setEdad(updatedPersona.getEdad());
            existingPersona.setNacimiento(updatedPersona.getNacimiento());
            return personaRepository.save(existingPersona);
        }
        return null;
    }

    public void deletePersona(Integer idpersona) {
        personaRepository.deleteById(idpersona);
    }
}