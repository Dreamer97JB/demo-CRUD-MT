package com.persona.metropolitan.metropolitandemo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import java.math.BigDecimal;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "factura")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idfactura;
    private String cedula;

    // Cambia el tipo de dato de Double a BigDecimal
    private BigDecimal valor;

    @ManyToOne
    @JoinColumn(name = "idpersona", nullable = false)
    private PersonaEntity persona;
}
