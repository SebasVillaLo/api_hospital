# Guía de uso de la API

Esta API ofrece la posibilidad de realizar operaciones como:

- Registro
- Inicio de sesión
- Actualización de usuario
- Eliminación de usuario
- Consulta de usuarios
- Creación de informes médicos
- Descarga de informes médicos
- Restablecimiento de contraseña

A continuación se presentan los detalles de cada operación y los parámetros requeridos para su ejecución.

link de la api

`https://apihospital.azurewebsites.net/`

Para testear la api usando Postman

[Postman](peticiones apiHospital.postman_collection.json)

## Registro

Para el registro de usuarios se requiere la siguiente información:

- identification: Identificación del usuario.
- email: Correo electrónico del usuario.
- phone: Teléfono del usuario.
- password: Contraseña del usuario.
- rol: Rol del usuario (Paciente, Doctor, Hospital).
- name: Nombre del usuario.
- address: Dirección del usuario.

Esta operación devuelve un token de acceso para poder ingresar al sistema.

### Ejemplo

```
POST /api/signup

Body:
{
  "identification": "1234567890",
  "email": "test@email.com",
  "phone": "1234567890",
  "password": "mypassword",
  "rol": "Paciente",
  "name": "Test User",
  "address": "My address"
}

Response:
{
  "message": "Email has been sent",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmU3ZDUzNjUyM2U4MDAxM2U1ODliZCIsImlkZW50aWZpY2F0aW9uIjoiMTIzNDU2Nzg5MCIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJyb2wiOiJQYWNpZW50ZSIsIm5hbWUiOiJUZXN0IFVzZXIiLCJhZGRyZXNzIjoiTXkgYWRkcmVzcyIsImlhdCI6MTU5MzA0ODI5MywiZXhwIjoxNTkzMTM0NjkzfQ.f5_yV5m5tKgjuV7mE-QJhVcS-1dKmV7WA9hJyHVhY4w"
}
```

## Registro de un doctor

Para el registro de doctores se requiere la siguiente información:

- identification: Identificación del usuario.
- email: Correo electrónico del usuario.
- phone: Teléfono del usuario.
- password: Contraseña del usuario.
- id_hospital: El id del hospital al cual pertenece el doctor
- rol: Doctor.
- name: Nombre del usuario.
- address: Dirección del usuario.

Esta operación manda un correo con la contraseña que se le asigno, al intentar iniciar sesion por primera vez, la api le resondera con un mensaje de cambiar la clave y un url para que lo haga

### Ejemplo

```
POST /api/signup_doctor/:tokenHospital

Body:
{
  "identification": "1234567890",
  "email": "test@email.com",
  "phone": "1234567890",
  "password": "mypassword",
  "id_hospital": "id123",
  "rol": "Doctor",
  "name": "Test User",
  "address": "My address"
}

Response:
{
  "message": "User has been create",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmU3ZDUzNjUyM2U4MDAxM2U1ODliZCIsImlkZW50aWZpY2F0aW9uIjoiMTIzNDU2Nzg5MCIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJyb2wiOiJQYWNpZW50ZSIsIm5hbWUiOiJUZXN0IFVzZXIiLCJhZGRyZXNzIjoiTXkgYWRkcmVzcyIsImlhdCI6MTU5MzA0ODI5MywiZXhwIjoxNTkzMTM0NjkzfQ.f5_yV5m5tKgjuV7mE-QJhVcS-1dKmV7WA9hJyHVhY4w"
}
```



## Inicio de sesión

Para el inicio de sesión se requiere la siguiente información:

- identification: Identificación del usuario.
- password: Contraseña del usuario.

Esta operación devuelve un token de acceso para poder ingresar al sistema.

### Ejemplo

```
POST /api/signin

Body:
{
  "identification": "1234567890",
  "password": "mypassword"
}

Response:
{
  "freshToken": "gQJhVcS-1dKmV7WA9hJyHVhY4",
  "token": "QJhVcS-1dKmV7WA9hJyHVhY4w"
}
```

## Inicio de sesión del Doctor

Para el inicio de sesión se requiere la siguiente información:

- identification: Identificación del usuario.
- password: Contraseña del usuario.

Esta operación devuelve un token de acceso para poder ingresar al sistema si anteriormente el usuario ha ingresado a la plataforma, de lo contrario le mandara una url para cambiar la contraseña.

### Ejemplo

```
POST /api/signin

Body:
{
  "identification": "1234567890",
  "password": "mypassword"
}

Response:
{
  "freshToken": "gQJhVcS-1dKmV7WA9hJyHVhY4",
  "token": "QJhVcS-1dKmV7WA9hJyHVhY4w"
}
```

### Ejemplo 2

```
POST /api/signin

Body:
{
  "identification": "1234567890",
  "password": "mypassword"
}

Response:
{
  "message": "Change password",
  "url": "ejemplo.com/api/password_change_doctor/<token>"
}
```

## Actualización de usuario

Para la actualización de usuarios se requiere la siguiente información:

- token: Token de acceso del usuario.
- (Opcional) email: Correo electrónico del usuario.
- (Opcional) phone: Teléfono del usuario.
- (Opcional) password: Contraseña del usuario.
- (Opcional) rol: Rol del usuario (Paciente, Doctor, Hospital).
- (Opcional) name: Nombre del usuario.
- (Opcional) address: Dirección del usuario.

### Ejemplo

```
POST /api/users_update/:token

Body:
{
  "email": "test2@email.com",
  "phone": "1234567891",
  "password": "mypassword2",
  "rol": "Paciente",
  "name": "Test User 2",
  "address": "My address 2"
}

Response:
{
  "message": "User has been updated"
}
```

## Eliminación de usuario

Para la eliminación de usuarios se requiere la siguiente información:

- token: Token de acceso del usuario.

### Ejemplo

```
DELETE /api/users_delete/:token

Response:
{
  "message": "User has been deleted"
}
```

## Consulta de usuarios

Para la consulta de usuarios se requiere la siguiente información:

- token: Token de acceso del usuario.

Esta operación devuelve los datos del usuario.

### Ejemplo

```
GET /api/user_get/:token

Response:
{
  "user": {
    "_id": "5efe7d53652e80013e589bd",
    "identification": "1234567890",
    "email": "test@email.com",
    "phone": "1234567890",
    "password": "mypassword",
    "rol": "Paciente",
    "name": "Test User",
    "address": "My address"
  }
}
```

## Creación de informes médicos

Para la creación de informes médicos se requiere la siguiente información:

- dataFile: Datos del informe médico.

Esta operación devuelve el informe médico en formato PDF.

### Ejemplo

```
GET /api/create_report

Body:
{
  "id_patient": "idexample1",
  "id_hospital": "idexample2",
  "id_doctor": "idexample3",
  "specialization,": "Medico General",
  "description": "El paciente cuenta con signos vitales poco estables",
}

Response:
{
  "message": "Medical report has been create"
}
```

## Descarga de informes médicos

Para la descarga de informes médicos se requiere la siguiente información:

- id: Datos del informe médico.

Esta operación devuelve el informe médico en formato PDF.

### Ejemplo

```
GET /api/download_report/:id

Se descarga el archivo
```

## Restablecimiento de contraseña

Para el restablecimiento de contraseñas se requiere la siguiente información:

- email: Correo electrónico del usuario.

Esta operación manda un correo al usuario com una url con un token para restablecer la contraseña.

### Ejemplo

```
POST /api/reset_password

Body:
{
  "email": "test@email.com"
}

Response:
{
  "message": "Email has been sent",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmU3ZDUzNjUyM2U4MDAxM2U1ODliZCIsImlkZW50aWZpY2F0aW9uIjoiMTIzNDU2Nzg5MCIsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJyb2wiOiJQYWNpZW50ZSIsIm5hbWUiOiJUZXN0IFVzZXIiLCJhZGRyZXNzIjoiTXkgYWRkcmVzcyIsImlhdCI6MTU5MzA0ODI5MywiZXhwIjoxNTkzMTM0NjkzfQ.f5_yV5m5tKgjuV7mE-QJhVcS-1dKmV7WA9hJyHVhY4w"
}
```

### Ejemplo url

```
POST /api/reset_password/:tokem

Body:
{
  "password": "newpassword"
}

Response:
{
  "message": "Password has been update",
}
```
