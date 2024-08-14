# metropolitandemo

Este proyecto es un ejemplo de aplicación Spring Boot que utiliza PostgreSQL como base de datos, Spring Data JPA para la persistencia de datos, y SpringDoc OpenAPI para la documentación de la API utilizando Swagger UI.

## Tecnologías Utilizadas

- **Spring Boot 3.3.2**
- **Java 17**
- **Maven**
- **Spring Data JPA**
- **PostgreSQL**
- **Lombok**
- **SpringDoc OpenAPI (Swagger UI)**

## Configuración del Proyecto

### 1. Dependencias Maven

Asegúrate de que tu archivo `pom.xml` incluya las siguientes dependencias para habilitar Swagger UI:

```xml
<dependencies>
    <!-- Otras dependencias de tu proyecto -->

    <!-- Swagger/OpenAPI con SpringDoc -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.1.0</version>
    </dependency>

    <!-- Dependencias adicionales -->
</dependencies>
