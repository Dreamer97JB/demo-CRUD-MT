package com.persona.metropolitan.metropolitandemo.controller;

import com.persona.metropolitan.metropolitandemo.model.FacturaEntity;
import com.persona.metropolitan.metropolitandemo.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @GetMapping("/all")
    public ResponseEntity<List<FacturaEntity>> getAllFacturas() {
        List<FacturaEntity> facturas = facturaService.getAllFacturas();
        return new ResponseEntity<>(facturas, HttpStatus.OK);
    }

    @GetMapping("/search/{idfactura}")
    public ResponseEntity<FacturaEntity> getFactura(@PathVariable("idfactura") Integer idfactura) {
        FacturaEntity factura = facturaService.getFacturaById(idfactura);
        return new ResponseEntity<>(factura, HttpStatus.OK);
    }

    

    @PostMapping("/create")
    public ResponseEntity<FacturaEntity> createFactura(@RequestBody FacturaEntity newFactura) {
        try {
            FacturaEntity savedFactura = facturaService.createFactura(newFactura);
            return new ResponseEntity<>(savedFactura, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{idfactura}")
    public ResponseEntity<FacturaEntity> updateFactura(@PathVariable("idfactura") Integer idfactura,
            @RequestBody FacturaEntity updatedFactura) {
        FacturaEntity factura = facturaService.updateFactura(idfactura, updatedFactura);
        return new ResponseEntity<>(factura, factura != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{idfactura}")
    public ResponseEntity<Void> deleteFactura(@PathVariable("idfactura") Integer idfactura) {
        facturaService.deleteFactura(idfactura);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
