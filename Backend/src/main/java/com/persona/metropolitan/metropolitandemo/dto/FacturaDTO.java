package com.persona.metropolitan.metropolitandemo.dto;

import lombok.Data;

@Data
public class FacturaDTO {
    private Integer idfactura;
    private String cedula;
    private Double valor;
    private Integer idpersona;
    private String nombreCliente;
}
