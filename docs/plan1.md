# Plan 1 – Portfolio template

## Uso de IA
Se utilizó IA como apoyo durante el proceso de desarrollo para definir
la estructura general del portfolio y resolver aspectos técnicos
concretos, como animaciones, transiciones entre secciones y
organización del código.

La IA se empleó como herramienta de apoyo y consulta, manteniendo
decisiones de diseño y ajustes finales realizados de forma manual.

---

## Prompts utilizados
- Definir la estructura general del portfolio con un navbar, hero,
  secciones de Works, About me, Contact y footer.
- Diseñar una interacción para el botón principal del hero que
  conectara visualmente con la sección Works.
- Implementar una animación en la que el hero se desplazara hacia
  arriba mientras el texto se desenfoca.
- Ajustar el comportamiento para que el hero reaparezca al volver
  al inicio de la página.
- Revisar y reorganizar el código CSS para mejorar su claridad y
  mantenibilidad.

---

## Plan propuesto
- Crear una estructura HTML clara, semántica y fácil de entender.
- Diseñar un hero con un título principal y un botón de llamada a la acción.
- Implementar una transición animada entre el hero y la sección Works.
- Dejar las secciones Works y About preparadas para añadir contenido
  en una fase posterior.
- Añadir un formulario de contacto visual y un footer con información
  básica y redes sociales.

---

## Implementación
- Se desarrolló un navbar fijo con enlaces a las secciones principales.
- Se creó un hero con el título “Welcome to my Portfolio” y el botón
  “Discover my art”.
- Se implementó una transición animada entre el hero y la sección Works
  utilizando CSS y JavaScript.
- Se dejaron las secciones Works y About como placeholders.
- Se añadió un formulario de contacto funcional a nivel visual y un
  footer con redes sociales.

---

## Interacción principal
La interacción principal del proyecto se centra en la transición entre
el hero y la sección Works.

Al pulsar el botón “Discover my art”, el bloque del hero se desplaza
hacia arriba mientras el texto se va desenfocando, dando paso de forma
simultánea a la sección de trabajos. Al volver al inicio de la página,
el hero reaparece de manera natural.

Esta interacción refuerza la narrativa del portfolio y guía al usuario
desde la introducción hacia el contenido principal.

---

## Organización y mantenimiento del código
Durante el desarrollo se realizó una revisión del código CSS para
mejorar su organización y legibilidad.

Se eliminaron estilos duplicados, se centralizaron variables de color
y tipografía en :root y se agruparon los estilos por secciones
(base, navbar, hero, secciones, formulario y footer).

Este refactor permite un código más limpio, mantenible y fácil de
escalar en el futuro.

---

## Decisión de diseño
El diseño general del portfolio se mantuvo intencionadamente limpio y
sencillo, priorizando la jerarquía visual y la experiencia de usuario.

Las animaciones se utilizaron de forma moderada para aportar dinamismo
sin distraer del contenido, manteniendo un equilibrio entre estética
y funcionalidad.

