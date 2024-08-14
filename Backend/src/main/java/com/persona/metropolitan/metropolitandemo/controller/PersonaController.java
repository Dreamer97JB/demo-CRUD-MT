package com.persona.metropolitan.metropolitandemo.controller;

import com.persona.metropolitan.metropolitandemo.model.PersonaEntity;
import com.persona.metropolitan.metropolitandemo.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping("/all")
    public ResponseEntity<List<PersonaEntity>> getAllPersonas() {
        List<PersonaEntity> personas = personaService.getAllPersonas();
        return new ResponseEntity<>(personas, HttpStatus.OK);
    }

    @GetMapping("/search/{idpersona}")
    public ResponseEntity<PersonaEntity> getPersona(@PathVariable("idpersona") Integer idpersona) {
        PersonaEntity persona = personaService.getPersonaById(idpersona);
        return new ResponseEntity<>(persona, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<PersonaEntity> createPersona(@RequestBody PersonaEntity newPersona) {
        PersonaEntity savedPersona = personaService.createPersona(newPersona);
        return new ResponseEntity<>(savedPersona, HttpStatus.CREATED);
    }

    @PutMapping("/update/{idpersona}")
    public ResponseEntity<PersonaEntity> updatePersona(@PathVariable("idpersona") Integer idpersona,
            @RequestBody PersonaEntity updatedPersona) {
        PersonaEntity persona = personaService.updatePersona(idpersona, updatedPersona);
        return new ResponseEntity<>(persona, persona != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{idpersona}")
    public ResponseEntity<Void> deletePersona(@PathVariable("idpersona") Integer idpersona) {
        personaService.deletePersona(idpersona);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
