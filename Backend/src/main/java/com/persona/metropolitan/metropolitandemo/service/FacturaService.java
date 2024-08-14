package com.persona.metropolitan.metropolitandemo.service;

import com.persona.metropolitan.metropolitandemo.model.FacturaEntity;
import com.persona.metropolitan.metropolitandemo.repository.FacturaRepository;
import com.persona.metropolitan.metropolitandemo.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaService {

    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private PersonaRepository personaRepository;

    public List<FacturaEntity> getAllFacturas() {
        return facturaRepository.findAll();
    }

    public FacturaEntity getFacturaById(Integer idfactura) {
        return facturaRepository.findById(idfactura).orElse(null);
    }

    public FacturaEntity createFactura(FacturaEntity factura) {
        // Verifica si la persona existe antes de crear la factura
        if (personaRepository.existsById(factura.getPersona().getIdpersona())) {
            return facturaRepository.save(factura);
        } else {
            throw new RuntimeException("Persona no existe");
        }
    }

    public FacturaEntity updateFactura(Integer idfactura, FacturaEntity updatedFactura) {
        FacturaEntity existingFactura = facturaRepository.findById(idfactura).orElse(null);
        if (existingFactura != null) {
            existingFactura.setCedula(updatedFactura.getCedula());
            existingFactura.setValor(updatedFactura.getValor());
            existingFactura.setPersona(updatedFactura.getPersona());
            return facturaRepository.save(existingFactura);
        }
        return null;
    }

    public void deleteFactura(Integer idfactura) {
        facturaRepository.deleteById(idfactura);
    }
}
