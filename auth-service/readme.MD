<h1 align="center">AUTH SERVICE</h1>

</br>

## Introducción

Este microservicio implementa un sistema de autenticación <u>Single Sign-On (SSO)</u> basado en la tecnología de <u>JSON Web Tokens (JWT)</u>. Su propósito es gestionar el registro de usuarios, inicio de sesión, cierre de sesión y la persistencia de las sesiones activas en la plataforma.

Los JWT se emiten durante el registro de usuarios, se validan en el inicio de sesión, y se verifican al realizar solicitudes al backend, permitiendo a los usuarios mantenerse activos en la plataforma. El sistema utiliza tanto tokens de acceso como tokens de refresco, siendo estos últimos rotativos para ofrecer mayor seguridad ante posibles reutilizaciones o robos de tokens, así como para gestionar el control de sesiones de los usuarios.

Este proyecto ha sido desarrollado utilizando <u>Node.js (versión 22.6.0)</u> con <u>TypeScript</u>, y cuenta con <u>Jest</u> y <u>Supertest</u> para realizar pruebas de integración.

## 🔬 Estructura del Proyecto

La aplicación cuenta con **cinco** controladores principales:

1. Signup Controller

   - Responsable del registro de usuarios mediante email y contraseña.

2. Auth Controller

   - Gestiona el inicio de sesión de los usuarios utilizando email, contraseña y la cookie que contiene el refresh token (JWT). Verifica las credenciales del usuario y luego decide cómo manejar los refresh tokens.
   - Aquí se gestionan situaciones como tokens robados, usuarios que se desconectaron sin utilizar su refresh token, y la creación y envío de un nuevo refresh token (en formato de cookie segura), junto con el access token necesario para realizar solicitudes al servidor.

3. Refresh Controller

   - Este controlador se utiliza cuando expira el access token del cliente.
   - Se proporciona el refresh token en formato de cookie segura y se evalúan situaciones como el uso indebido del refresh token, la verificación de si pertenece al usuario, el borrado del token antiguo y su reemplazo por uno nuevo, que también se guarda en la base de datos y se envía al cliente.

4. Logout Controller

   - Se encarga de eliminar el refresh token del cliente en la base de datos y de señalizar la eliminación de la cookie que contiene dicho token, deslogueando al usuario de la plataforma.

5. Users Controller

   - Ofrece funcionalidades como obtener todos los usuarios, consultar un único usuario y eliminar un usuario. Este controlador simula cualquier operación CRUD de datos en el servidor.

### Frameworks y Librerías Utilizadas

Se han utilizado frameworks como <u>Express</u> y las siguientes librerías:

- **jsonwebtoken**: Para la firma, creación y validación de tokens.
- **prisma**: ORM para realizar operaciones CRUD en la base de datos PostgreSQL.
- **pg**: Para la conexión a PostgreSQL.
- **bcrypt**: Para codificar y validar contraseñas.
- **cookie-parser**: Para crear, leer y enviar cookies seguras a los clientes.
- **cors**: Para gestionar las políticas de acceso entre dominios.
- **zod**: Para la validación de datos de entrada en el servidor.
- **morgan**: Para registrar toda la actividad del servidor.

### Pruebas e Integración

Cada controlador tiene asociado un archivo con pruebas de integración, además de funciones auxiliares (helpers) que se utilizan en varios de estos archivos.

### Calidad del Código

Se han utilizado formatters para mantener un código limpio y consistente.

## 📐 Arquitectura

Este proyecto backend sigue una <u>Arquitectura Hexagonal basada en clases</u>, que proporciona una estructura modular y escalable. La arquitectura hexagonal ayuda a mantener el código organizado y facilita la integración con diferentes componentes y servicios.

La estructura del proyecto se organiza en las siguientes carpetas principales:

- **prisma**: Contiene el modelo de datos definido en el archivo `schema.prisma`, utilizado para la creación y gestión de la base de datos, así como para las migraciones.
- **src**: Alberga el código fuente de la aplicación, que se detallará a continuación.
- **tests**: Incluye las pruebas de integración para cada controlador.

La arquitectura se compone de **tres** capas principales:

- **Infrastructure**: Es el nivel que gestiona la interacción directa con la base de datos a través de los repositorios. Además, aquí se encuentran las dependencias específicas de la arquitectura hexagonal, los middlewares, los controladores, las rutas, las esquemas de validación de entrada de datos, los archivos de configuración y los registros de logs.

- **Application**: Contiene la lógica de negocio de la aplicación. En esta capa residen los servicios responsables de procesar las solicitudes de los controladores y comunicarse con los repositorios. También se encuentra aquí la implementación de los errores.

- **Domain**: Define las entidades, repositorios y servicios utilizados a través de interfaces. Esta capa proporciona una abstracción clara del dominio del negocio.

El servicio se inicia a través del archivo `server.ts`, que configura y ejecuta el servidor.

## 🔨 Instalación y Configuración

### 1. Clona el Repositorio

```bash
git clone https://github.com/IgnaLog/eliteon
cd .\eliteon\auth-service\
```

### 2. Instala las Dependencias

Asegúrate de tener Node.js 22.6.0 instalado. Luego, ejecuta:

```bash
npm install
```

### 3. Configuración del Entorno

Para comenzar, crea una instancia de PostgreSQL utilizando Docker:

```bash
docker run --name postgres-container \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=1234 \
    -p 5432:5432 \
    -d postgres
```

Si prefieres tener también pgAdmin4 para visualizar los datos, sigue estos pasos:

1. Crea una red Docker para que los contenedores se comuniquen entre sí:

   ```bash
   docker network create postgres-network
   ```

2. Inicia el contenedor de PostgreSQL dentro de la red postgres-network que acabas de crear:

   ```bash
   docker run --name postgres-container \
       --network postgres-network \
       -e POSTGRES_USER=postgres \
       -e POSTGRES_PASSWORD=1234 \
       -p 5432:5432 \
       -d postgres
   ```

3. Inicia el contenedor de pgAdmin4, conectado también a la red `postgres-network`:

   ```bash
   docker run --name pgadmin-container \
       --network postgres-network \
       -e PGADMIN_DEFAULT_EMAIL=ignacio.coding@gmail.com \
       -e PGADMIN_DEFAULT_PASSWORD=1234 \
       -p 80:80 \
       -d dpage/pgadmin4
   ```

4. Abre tu navegador web y visita http://localhost. Esto abrirá la interfaz de pgAdmin4.

5. Inicia sesión con el correo electrónico y contraseña que especificaste (ignacio.coding@gmail.com y 1234).

6. Una vez dentro, agrega un nuevo servidor:
   - Nombre: Puedes poner cualquier nombre.
   - Host: El nombre del contenedor de PostgreSQL, en este caso postgres-container.
   - Puerto: 5432 (el puerto predeterminado de PostgreSQL).
   - Usuario: El usuario que creaste (postgres).
   - Contraseña: La contraseña que especificaste (1234).

Crea un archivo `.env` en la raíz del proyecto y añade tus claves secretas para los tokens, el puerto donde se iniciará el servidor, y las URLs de conexión a la base de datos principal y de pruebas:

```bash
PORT=3500

DATABASE_URL="postgresql://postgres:1234@localhost:5432/pernauth"
TEST_DATABASE_URL="postgresql://postgres:1234@localhost:5432/test_pernauth"

ACCESS_TOKEN_SECRET=20da7cdc2151523a03f5c894a497df77432bf1a18be5c13372710c7c65371ac82c48ae5cf0790574036c670d51377d5e3777eedbb94a368af5ecaed21e2b1c41
REFRESH_TOKEN_SECRET=92ce846dc8cd561168b3f2eff2260dd63c50331a5339c2aaeba87e9c70a09e6f2c9362aa374c7c78996d59cfec7ded142c962a0ee9088ab642d1ea53ce8627aa
```

Crea las migraciones para el modelo de Prisma:

1. Primero, elimina las migraciones anteriores en la carpeta prisma/migrations:

   ```bash
   rmdir /s /q prisma\migrations
   ```

2. Luego, ejecuta una nueva migración, lo cual creará una base de datos nueva con el modelo especificado en `schema.prisma`:

   ```bash
   npx prisma migrate dev --name init
   ```

Para configurar una base de datos de prueba para los tests, modifica el archivo `schema.prisma` cambiando la siguiente línea:

```bash
datasource db {
  provider = "postgresql"
  url      = env("TEST_DATABASE_URL")
}
```

Es decir, cambia `DATABASE_URL` por `TEST_DATABASE_URL` y luego ejecuta de nuevo las migraciones para crear la base de datos de prueba:

```bash
npx prisma migrate dev
```

### 4. Ejecutar la Aplicación

#### Modo Desarrollo

Para iniciar el entorno de desarrollo, ejecuta el siguiente comando:

```bash
node --run dev
```

Esto pondrá en marcha un servidor de desarrollo en el puerto configurado. Deberías ver los siguientes mensajes:

```bash
Server running on port 3500
Successful connection to the database
```

Cualquier cambio en el código hará que el servidor se actualice automáticamente.

#### Modo Producción

Para generar una versión de producción del servidor, ejecuta:

```bash
npm run build
```

Este comando creará una carpeta _dist_ con los archivos JavaScript compilados listos para ser desplegados.

También puedes compilar y ejecutar la aplicación en modo producción con el siguiente comando:

```bash
npm start
```

## 🧪 Testing

Consulta la sección de [Configuración del Entorno](#configuración-del-entorno) para configurar una base de datos de prueba adecuada.

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test
```

También puedes ejecutar las pruebas en modo "watch". En este modo, las pruebas se ejecutan automáticamente cada vez que realizas cambios en el código, lo que facilita el desarrollo y depuración. Para habilitar este modo, utiliza el siguiente comando:

```bash
npm run test:watch
```

## 🧠 Mejoras

### RefreshToken

Dependiendo del uso de la plataforma, verifica cuánto tiempo duran típicamente los tokens de refresco en términos de expiración en plataformas comunes. Suponiendo un período de expiración de 365 días, significaría que un usuario podría acceder a la plataforma dentro de un período de 365 días antes de que su sesión expire. Puede haber casos en los que un usuario crea continuamente nuevos tokens de refresco porque no tiene acceso a los anteriores, ya sea porque fueron eliminados de su navegador o porque iniciaron sesión desde un navegador en modo incógnito. Esto podría llevar a un exceso de tokens de refresco no utilizados en la base de datos. La base de datos debería tener un procedimiento para eliminar esos tokens de refresco que no se han utilizado durante un cierto período. El problema con esto es que si establecemos ese cierto período en menos de 365 días (digamos 30 días), que es la duración de expiración del refreshToken, entonces tener esa expiración ya no tendría sentido porque el refreshToken habría expirado en 30 días, y por lo tanto, la expiración de la sesión sería de 30 días, no de 365 días.

Una posible solución es tener un procedimiento en la base de datos que elimine los tokens que hayan superado su fecha de expiración, es decir, que hayan estado presentes durante más de 365 días. Además, limitar el número de tokens que un usuario puede tener almacenados. Supongamos un límite de 8 tokens por usuario. Ese usuario solo puede tener 8 sesiones activas. Si alcanzan el límite de 8 sesiones activas y tratan de iniciar una nueva sesión, se elimina la más antigua (el token más antiguo) para hacer espacio para la nueva. Si intentan iniciar sesión con un token de esas 8 sesiones, no habrá problema porque el token antiguo se elimina y el nuevo se guarda, manteniendo el límite de 8 sesiones.

Para esta última solución, debemos manejar lo que ocurre cuando se intenta iniciar sesión con un token que ya ha sido eliminado, ya que actualmente esto se detecta como un intento de reutilizar un token debido a un posible hackeo, lo que lleva a la eliminación de todos los tokens de ese usuario e invalida todas las sesiones. Esta es una situación que no se aplica a nuestro caso anterior. Una solución es sacrificar esta medida de seguridad de eliminar todos los tokens de ese usuario y tratar el nuevo token como si fuera uno nuevo.

### Login

Controla el número de inicios de sesión, es decir, que el mismo usuario realice numerosos inicios de sesión. Esto podría resultar en la creación de múltiples tokens de refresco para el mismo usuario, posiblemente logrado con un navegador en modo incógnito. Para abordar esto, limita el número de inicios de sesión consecutivos del mismo usuario. Esto podría resolverse con la solución del paso anterior.

### Signup

Controla la posibilidad de que alguien se registre con múltiples cuentas simultáneamente. Esto podría ser un intento de crear bots o cuentas falsas. Para abordar esto, limita el número de registros realizados desde la misma dirección IP y huella digital.
