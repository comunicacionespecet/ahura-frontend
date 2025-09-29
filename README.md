# AHURA Frontend

## 📌 Descripción general
**AHURA Frontend** es la interfaz web del sistema **AHURA**, enfocada en la gestión de **activos de conocimiento**.  
Provee herramientas para que usuarios autenticados puedan:

- Crear, editar, visualizar y administrar activos.
- Gestionar usuarios y comentarios.
- Acceder a un entorno seguro con autenticación y autorización.

---

## 📂 Estructura del proyecto

```ascii
src
├── assets        🎨 Recursos estáticos (imágenes, logos, íconos)
├── components    ⚛️ React Components
│   ├── atoms     🔹 Botones, inputs, labels
│   ├── molecules 🔸 Formularios simples, tarjetas
│   └── organisms 🏗️ Secciones completas (dashboards, layouts)
├── context       🌍 AuthContext, ThemeContext, etc.
├── hooks         ♻️ Custom hooks reutilizables
├── services      🔌 Conexión a la API vía Axios
└── utils         🛠️ Funciones helper
⚙️ Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/tu-org/ahura-frontend.git
cd ahura-frontend


Instalar dependencias:

npm install


Ejecutar en modo desarrollo:

npm run dev


Configurar variables de entorno:
Crear un archivo .env en la raíz del proyecto con:

VITE_API_URL=http://localhost:3000

🧩 Guía de desarrollo
🔹 Crear un componente
// filepath: src/components/atoms/MyComponent.jsx
import React from 'react';

const MyComponent = ({ text }) => (
  <div>{text}</div>
);

export default MyComponent;

🔹 Crear un servicio
// filepath: src/services/myService.js
import axios from 'axios';

export const getData = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/endpoint`);
  return res.data;
};

🔹 Crear un hook
// filepath: src/hooks/useMyData.js
import { useState, useEffect } from 'react';
import { getData } from '../services/myService';

export const useMyData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return { data };
};


Uso en un componente:

import { useMyData } from '../hooks/useMyData';

const Example = () => {
  const { data } = useMyData();
  return <div>{data}</div>;
};

🔐 Autenticación y autorización

El archivo AuthContext.jsx maneja:

Estado del usuario.

Token de sesión.

Usa PrivateRoute para proteger rutas sensibles.

Ejemplo:

<PrivateRoute>
  <Dashboard />
</PrivateRoute>

🚀 Despliegue en AWS con Nginx
🔧 Instalación inicial en el servidor
sudo dnf update -y
sudo dnf install -y nginx git nodejs npm

📥 Clonar y construir
cd /home/ec2-user
git clone https://github.com/tu-org/ahura-frontend.git
cd ahura-frontend
npm install
npm run build

🌍 Configuración de Nginx
sudo mkdir -p /var/www
sudo ln -s /home/ec2-user/ahura-frontend/dist /var/www/html


Crear archivo de configuración:

sudo tee /etc/nginx/conf.d/ahura-frontend.conf > /dev/null <<EOF
server {
    listen 80;
    server_name _;  # Acepta cualquier dominio/IP
    root /var/www/html;
    index index.html;

    # Single Page Applications
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Archivos estáticos con cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compresión
    gzip on;
    gzip_vary on;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
EOF


Revisar y habilitar:

sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx

🔄 Script de actualización automática
cat > /home/ec2-user/update-frontend.sh << 'EOF'
#!/bin/bash
cd /home/ec2-user/ahura-frontend
git pull
npm install
npm run build
sudo systemctl reload nginx
echo "✅ Frontend actualizado!"
EOF

chmod +x /home/ec2-user/update-frontend.sh


Ejecutar actualización:

./update-frontend.sh

🔗 Flujo de despliegue (visual)
   👨‍💻 Dev local
        |
        | git push
        v
   🌐 GitHub Repo
        |
        | git pull (en servidor AWS)
        v
   🖥️ Servidor EC2
        |
        | npm install && npm run build
        v
   📂 Carpeta /dist
        |
        | servido por Nginx
        v
   🌍 Usuario final (navegador)

📖 Notas importantes

Todos los cambios deben ser integrados en la rama main mediante Pull Request (PR).

El servidor actualiza con el script:

./update-frontend.sh


Logs de Nginx:

sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

👥 Autores

Equipo de desarrollo AHURA
Mateo Bedoya Ospina
José Luis Aguirre Ramirez

📅 Última actualización: Septiembre 2025
