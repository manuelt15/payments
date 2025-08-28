# 💳 Payments App (Frontend)

Aplicación **frontend en React (Vite)** para la gestión de pagos.  
Se conecta a una API REST (Express + MongoDB) para **crear, listar y eliminar pagos**.  

---

## 🚀 Características

- Listado dinámico de pagos obtenidos desde la API.  
- Agregar nuevos pagos mediante un formulario.  
- Eliminar pagos existentes.  
- Animaciones con **Framer Motion**.  
- Alertas modernas con **SweetAlert2**.  
- Estilos personalizados con CSS (`Main.css`).  

---

## 📂 Estructura del Proyecto

```bash
src/
├── components/
│   └── Main.jsx       # Componente principal de la app
├── assets/            # Imágenes estáticas (user.png, pay.png, etc.)
├── Main.css           # Estilos principales
└── main.jsx           # Punto de entrada de React

🛠️ Tecnologías Usadas

React (Vite)

Framer Motion
 (animaciones)

SweetAlert2
 (alertas)

Fetch API
 (peticiones HTTP)

CSS Modules / Custom CSS

📸 Vista Previa

Ejemplo de la UI con tarjetas de pagos y formulario emergente.

📌 Notas

Necesitas tener corriendo la API Express en {VITE_EXPRESS} para que funcione.

Los logos y nombres de tiendas se asignan de manera aleatoria en cada render.

Si quieres persistir el usuario, puedes conectar con un sistema de autenticación en el futuro.
