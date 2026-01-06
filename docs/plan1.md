# Plan 1 – Interactive portfolio

## Use of AI
During the development of the project, artificial intelligence was used as a support and consultation tool. Its use focused on defining the overall structure of the portfolio and resolving specific technical issues, such as animations, transitions between sections, and the organization of HTML, CSS, and JavaScript code.

AI was used as a one-off support tool to explore solutions and optimize workflow, while final decisions on design, interaction, and visual adjustments were made and refined manually.

---

## Prompts used
- Define the general structure of a portfolio with sections for Hero, Works, About me, Skills & Tools, Contact, and Footer.
- Design a main interaction for the hero button that visually connects to the Works section.
- Implement an animated transition between the hero and the Works section using CSS and JavaScript.
- Adjust the behavior so that the hero reappears when returning to the top of the page.
- Review and reorganize the CSS and JavaScript code to improve its clarity, readability, and maintainability.
- Propose a horizontal carousel for the Works section with automatic playback.

---

## Initial plan
The initial project plan focused on establishing a solid foundation both visually and structurally. The main objectives were:

- Create a clear, semantic, and easy-to-maintain HTML structure.
- Design a hero section with a main title and a call-to-action button.
- Implement an animated transition between the hero section and the Works section as the main interaction on the site.
- Prepare the Works and About sections for future content expansion.
- Add a visual contact section with a form and a footer with basic information and links to social media.

---

## Development and implementation
Throughout development, the project evolved beyond the initial approach and the following features were implemented:

- Development of a fixed and responsive navigation bar, with a hamburger menu on mobile devices.
- Creation of a hero section with graphic elements (stickers and doodles) and subtle animations to reinforce the visual identity.
- Implementation of an animated transition between the hero and the Works section, synchronizing scrolling, blurring, and content appearance.
- Development of the Works section as a horizontal carousel with autoplay and track duplication for a continuous loop.
- Implementation of a project modal with navigation between projects (prev/next) and navigation between images (prev/next) and counter.
- Design of the About me section with adaptive behavior and collapsible text on mobile devices.
- Incorporation of the Skills & Tools section using visual chips with proficiency levels.
- Creation of a Contact section with information cards and a visual form (browser validation and simulated submission).
- Implementation of a footer with social media links and a “Back to top” button.

---

## Main interaction
The main interaction of the project focuses on the transition between the hero and the Works section.

When you click on the “Discover my art” button, the hero block moves up while the content gradually fades out, smoothly transitioning to the works section. When you return to the top of the page, the hero reappears, returning to its initial state.

This interaction guides the user from the introduction to the main content and reinforces the visual narrative of the portfolio.

---

## Works carousel
The Works section was designed as a horizontal carousel with automatic playback, intended to display projects dynamically and continuously.

The carousel scrolls smoothly and respects the “reduced motion” preference. In addition, projects can be opened in a detailed modal, from which it is possible to navigate between different works and images.

This approach allows for visual exploration of the content without overloading the interface.

---

## Code organization and maintenance
During development, the code was reviewed and refactored to improve its organization and maintenance:

- Centralization of color and typography variables in `:root`.
- Grouping of CSS by logical blocks (base, navigation, hero, sections, components, form, and footer).
- Removal of duplicate styles and unnecessary rules.
- Reorganization of JavaScript by separating data, state, logic, and interactions to make it more readable and easier to extend.

This structure facilitates understanding of the project and allows for future improvements in a simple manner.

---

## Design decisions
The overall design of the portfolio was intentionally kept clean and balanced, prioritizing visual hierarchy and user experience.

Animations and transitions were used in a controlled manner to add dynamism without distracting from the content, maintaining a balance between aesthetics and functionality.


