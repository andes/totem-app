# totem-app
Totem para turnos


# LOCAL

En nuestro entorno local vamos a compilar la aplicación:

ng build --prod --aot=true

Los archivos del proyecto se guardarán en un directorio llamado dist.

# TOTEM

Instalar angular http server

npm install -g http-server

Instalar pm2

npm install pm2 -g

Llevar la carpeta dist generada localmente al totem. Pararse en el directorio y levantar la aplicación en el puerto 8080 con el siguiente comando:

pm2 start angular-http-server --name totem-app

Abrir el chrome en modo kiosko

google-chrome --kiosk --kiosk-printing “http://localhost:8080”

# COMANDOS PM2

Para listar todos los procesos en ejecución, ejecutar:

pm2 list

Para detener procesos, ejecutar:

pm2 stop

Para eliminar procesos, ejecutar:

pm2 stop
