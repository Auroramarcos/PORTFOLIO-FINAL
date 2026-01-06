# Plan 1 – Portfolio interactivo

## Uso de IA
Durante el desarrollo del proyecto se utilizó inteligencia artificial como herramienta de apoyo y consulta. Su uso se centró en definir la estructura general del portfolio y resolver aspectos técnicos concretos, como animaciones, transiciones entre secciones y organización del código HTML, CSS y JavaScript.

La IA se empleó como apoyo puntual para explorar soluciones y optimizar el flujo de trabajo, mientras que las decisiones finales de diseño, interacción y ajustes visuales fueron tomadas y refinadas manualmente.

---

## Prompts utilizados
- Definir la estructura general de un portfolio con secciones de Hero, Works, About me, Skills & Tools, Contact y Footer.
- Diseñar una interacción principal para el botón del hero que conectara visualmente con la sección Works.
- Implementar una transición animada entre el hero y la sección Works mediante CSS y JavaScript.
- Ajustar el comportamiento para que el hero reaparezca al volver al inicio de la página.
- Revisar y reorganizar el código CSS y JavaScript para mejorar su claridad, legibilidad y mantenibilidad.
- Proponer un carrusel horizontal para la sección Works con reproducción automática.

---

## Plan inicial
El plan inicial del proyecto se centró en establecer una base sólida tanto a nivel visual como estructural. Los objetivos principales fueron:

- Crear una estructura HTML clara, semántica y fácil de mantener.
- Diseñar un hero con un título principal y un botón de llamada a la acción.
- Implementar una transición animada entre el hero y la sección Works como interacción principal del sitio.
- Preparar las secciones Works y About para una futura ampliación de contenido.
- Añadir una sección de contacto visual con formulario y un footer con información básica y enlaces a redes sociales.

---

## Desarrollo e implementación
A lo largo del desarrollo, el proyecto evolucionó más allá del planteamiento inicial y se implementaron las siguientes funcionalidades:

- Desarrollo de un navbar fijo y responsive, con menú hamburguesa en móvil.
- Creación de un hero con elementos gráficos (stickers y doodles) y animaciones sutiles para reforzar la identidad visual.
- Implementación de una transición animada entre el hero y la sección Works, sincronizando desplazamiento, desenfoque y aparición del contenido.
- Desarrollo de la sección Works como carrusel horizontal con autoplay y duplicado del track para un bucle continuo.
- Implementación de un modal de proyectos con navegación entre proyectos (prev/next) y navegación entre imágenes (prev/next) y contador.
- Diseño de la sección About me con comportamiento adaptativo y texto plegable en dispositivos móviles.
- Incorporación de la sección Skills & Tools mediante chips visuales con nivel de dominio.
- Creación de una sección Contact con tarjetas de información y formulario visual (validación del navegador y envío simulado).
- Implementación de footer con redes sociales y botón “Back to top”.

---

## Interacción principal
La interacción principal del proyecto se centra en la transición entre el hero y la sección Works.

Al pulsar el botón “Discover my art”, el bloque del hero se desplaza hacia arriba mientras el contenido se desenfoca progresivamente, dando paso de forma fluida a la sección de trabajos. Al volver al inicio de la página, el hero reaparece recuperando su estado inicial.

Esta interacción guía al usuario desde la introducción hacia el contenido principal y refuerza la narrativa visual del portfolio.

---

## Works carousel
La sección Works se diseñó como un carrusel horizontal con reproducción automática, pensado para mostrar los proyectos de forma dinámica y continua.

El carrusel se desplaza de manera fluida y respeta la preferencia de “reduced motion”. Además, los proyectos pueden abrirse en un modal detallado, desde el cual es posible navegar entre distintos trabajos e imágenes.

Este enfoque permite una exploración visual del contenido sin sobrecargar la interfaz.

---

## Organización y mantenimiento del código
Durante el desarrollo se realizó una revisión y refactorización del código para mejorar su organización y mantenimiento:

- Centralización de variables de color y tipografía en `:root`.
- Agrupación del CSS por bloques lógicos (base, navegación, hero, secciones, componentes, formulario y footer).
- Limpieza de estilos duplicados y reglas innecesarias.
- Reorganización del JavaScript separando datos, estado, lógica e interacciones para hacerlo más legible y fácil de ampliar.

Esta estructura facilita la comprensión del proyecto y permite futuras mejoras de forma sencilla.

---

## Decisiones de diseño
El diseño general del portfolio se mantuvo intencionadamente limpio y equilibrado, priorizando la jerarquía visual y la experiencia de usuario.

Las animaciones y transiciones se utilizaron de forma controlada para aportar dinamismo sin distraer del contenido, manteniendo un equilibrio entre estética y funcionalidad.


