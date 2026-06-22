# 🎯 Memorama de Profesiones

Un juego interactivo y educativo de Memorama (Memory Game) con temática de profesiones. Diseñado para ofrecer una experiencia visualmente atractiva, moderna, adaptada a dispositivos móviles y accesible para todos.

![Preview](https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600)

## ✨ Características

- 🎮 **Dos Niveles de Dificultad**:
  - **Fácil**: Tablero de 16 cartas (8 pares).
  - **Difícil**: Tablero de 24 cartas (12 pares).
- ⏱️ **Estadísticas en tiempo real**: Registro del número de movimientos y del tiempo transcurrido.
- ⭐ **Sistema de Puntuación**: Puntuación de 1 a 3 estrellas según el rendimiento (tiempo y movimientos).
- 🚀 **Animaciones Fluidas**: Efecto 3D de volteo de cartas y transiciones cuidadas con animaciones de éxito o error al emparejar.
- 📱 **Diseño Responsivo**: Totalmente optimizado para jugar en computadoras, tabletas y teléfonos celulares.
- ♿ **Accesible**: Soporte completo para navegación mediante teclado (teclas `Tab`, `Espacio` y `Enter`).

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica del juego.
- **CSS3 (Custom Properties / Grid / Flexbox / 3D Transforms)**: Estilos visuales de alto impacto con efecto "Glassmorphism" y animaciones.
- **JavaScript (ES Modules)**: Lógica interna del juego, mezcla aleatoria con algoritmo Fisher-Yates, control de turnos y puntuación.
- **Google Fonts (Nunito)**: Tipografía moderna y amigable.

## 🚀 Cómo subir este proyecto a GitHub Pages

Para publicar este juego gratis en internet usando **GitHub Pages**, sigue estos sencillos pasos:

1. **Crea un repositorio en GitHub**:
   - Inicia sesión en tu cuenta de GitHub.
   - Haz clic en **New** (Nuevo repositorio).
   - Nómbralo como `memorama-profesiones` (o el nombre que gustes).
   - Deja el repositorio como **Public** y no marques ninguna casilla de inicialización. Haz clic en **Create repository**.

2. **Sube los archivos a GitHub**:
   - Puedes arrastrar y soltar la carpeta completa a la interfaz web de GitHub, o usar la línea de comandos de git en tu computadora:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/memorama-profesiones.git
     git push -u origin main
     ```

3. **Configura GitHub Pages**:
   - Ve a la pestaña **Settings** (Configuración) de tu repositorio en GitHub.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En la sección **Build and deployment**, bajo **Source**, selecciona **Deploy from a branch**.
   - En **Branch**, selecciona la rama **main** y la carpeta `/ (root)`. Haz clic en **Save** (Guardar).
   - ¡Listo! En un par de minutos, GitHub te dará un enlace (ej: `https://TU_USUARIO.github.io/memorama-profesiones/`) donde podrás jugar en línea y compartirlo con tus amigos.
