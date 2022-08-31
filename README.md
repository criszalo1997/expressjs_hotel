# expressjs_hotel
express js api hotel boking mysql


este es un ejemplo de uso de express js y mysql
para hacer uso de las api se debe usar postman las api estan mapeadas en el archivo prueba_tecnica.postman_collection.json que se encuentra en el repositorio
```
herramientas usadas:
  -express js
  -docker
  -docker compose
  -mysql
  -dotenv
 ```
se manejaron 3 tablas para el reto la importacion de los datos se encuentra en el archivo prueba_tecnica.sql del repositorio
```
- clientes
  1 nombre	varchar(250)	
	2	ci	varchar(250)	
	3	direccion	varchar(250)	
	4	telefono	varchar(250)	
	5	created_at	datetime			
	6	updated_at datetime
- habitacion
  1 numero	int(11)	
	2	estado	varchar(50)
	3	tipo	varchar(255)
	4	camas	int(11)	
	5	precio	double			
	6	created_at	datetime			
	7	updated_at datetime
- reservaciones
	1	fechaini	datetime			
	2	fechafin	datetime			
	3	met_pago	enum('EFECTIVO', 'TARJETA', 'CHEQUE')	
	4	estado	enum('PENDIENTE', 'PAGADO', 'ELIMINADO')	
	5	pago	double
	6	habitacion_id	int(11)
	7	cliente_id	int(11)	
	8	created_at	datetime			
	9	updated_at	datetime
  ```
para hacer uso del proyecto clone el repositorio con git clone https://github.com/criszalo1997/expressjs_hotel

para hacer uso sin docker debe instalar las librerias del package.json y debe tener en instalacion de mysql con una base de datos llamada prueba_tecnica

para configurar la base de datos los puertos y usuario de base de datos puede modificar el archivo .env

```
DATABASE_HOST=db-node-mysql
DATABASE_NAME=prueba_tecnica
DATABASE_USER=soporte
DATABASE_PASS=insertec1.

NODE_DOCKER_HOST=0.0.0.0
NODE_DOCKER_PORT=5000
```
Para instalar las librerias debe realizar el comando install de npm

```
npm install
```
para ejecutar el proyecto cuando lo tenga configurado debe utilizar el comando start de npm

```
npm start
```
para hacer uso correcto de la aplicacion

- la tabla cliente debe tener registros insertados

- la tabla habitaciones debe tener registros insertados

- luego en la tabla reservaciones para registrar reservaciones debe agregar las fechas de estadia, el estado el pago de la reservacion en base al costo de la habitacion, el id del cliente, el id de la reservacion estos datos de id deben ser  verificados previamente en la base de datos

---------------------------------------------------------
para ejecutar con docker debe posicionarse en en el directorio raiz del proyecto y construir el proyecto con el comando

```
docker-compose up -d --build
```
con ese comando construiremos los contenedores de la api y la base de datos para verificar el estado de los contenedores ingresar el comando

```
docker-compose ps
```
luego de eso necesitamos importar las estructura de la base de datos con el archivo prueba_tecnica.sql podemos realizar con el siguiente comando

```
docker exec -i db-node-mysql mysql -uroot -pinsertec1. prueba_tecnica < prueba_tecnica.sql
```

para asegurarnos de que la aplicacion este funcionando correctamente reiniciaremos el contenedor docker de la api con el siguiente comando

```
docker restart api-hotel
```

al final los 2 contenedores de la base de datos y la aplicacion deberian estar funcionado correctamente y podremos entrar a verficar la aplicacion desde el  puerto 5000

```
docker-compose ps
```

esto es todos,  gracias !!!
  
