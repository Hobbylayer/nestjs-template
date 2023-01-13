<!-- Recommended reading -->
<!-- https://www.freecodecamp.org/news/how-to-write-a-good-software-design-document-66fcf019569c/ -->

# Naboer Design Doc
Link: [Link to this docs](#)

Author(s):
- [AlphaTechnolog](https://github.com/AlphaTechnolog)
- [j4viermora](https://github.com/j4viermora)

**Status**: Draft

**Last Update**: 12/01/23

## Contents

- [Overview](#overview)
- [Goals](#goals)
- [Background](#background)
- [Detailed Design](#detailed-design)
    - Solution 1
        - Frontend
        - Backend

## Overview

Esta documentacion trata en profundidad las desiciones que se toman a cabo
a la hora de implementar la funcionalidad de multi-monedas en naboer app.

## Goals

- Encontrar una manera eficiente de manejar las multi-monedas a la hora de crear transacciones.
- Tener el exchange-rate de la moneda elegida actualizado al momento de realizar la transaccion.
- Registrar el exchange-rate para posteriormente hacer reportes.

## Background

Es necesaria una manera de poder manejar de manera eficiente el tema de la multi-moneda para que a la hora
de crear transacciones, los calculos de las conversiones de monedas a moneda principal, sean realizados de manera satisfactoria.

## Detailed Design

- Solucion 1:

    - **Backend**: Manejar un modulo para currencies, como un crud. A la hora de registrar una transaccion el mismo debe
    de verificar la moneda seleccionada, si la misma no es la principal, debe de obtener el exchange rate mas reciente de dicha moneda y
    seguidamente realizar la conversion y guardar los dos montos, tanto en moneda principal como en moneda seleccionada...
    tambien debe de guardarse en la transaccion el exchange rate en dicho momento para permitir realizar la realizacion de los
    informes/reportes. si la moneda seleccionada es la principal, simplemente usar el monto con la currency = la currency principal.

    - **Frontend**: El modulo de currencies estara disponible solo para los desarrolladores, es decir no se implementara un modulo
    grafico como tal, simplemente se realizaran las inserciones, eliminaciones y demas usando postman. A la hora de registrar la transaccion
    se debe mostrar el campo de moneda (puede ser representado con un select), el mismo formulario se encargara de enviar la data al backend
    de manera que el mismo realize las verificaciones anteriormente mencionadas.
    Al momento de crear un income o un expense verificar que la moneda del pago sea igual a la moneda del banco que se elegiio 
