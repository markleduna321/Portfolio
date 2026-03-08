# Developer Portfolio

A modern, interactive developer portfolio built with React and Vite, featuring dark mode, Redux state management, and a beautiful responsive design.

## Features

### 🎨 Interactive & Modern Design
- Beautiful gradient animations
- Smooth scroll navigation
- Dark/Light mode toggle
- Responsive design for all devices
- Custom animations and transitions

### 📱 Portfolio Sections
- **Hero Section**: Eye-catching introduction with animated background
- **Projects Section**: Interactive project cards with detailed modals
  - Screenshot previews
  - Tech stack badges
  - Live demo embeds
  - Code previews
  - GitHub integration
  - Filter by category
- **Skills Section**: Visual skill representations with progress bars
- **Experience Section**: Professional timeline with achievements
- **GitHub Activity**: Real-time GitHub stats and contributions
- **Contact Section**: Functional contact form with social links

### 🛠️ Tech Stack

- React 18
- Redux Toolkit with Thunks
- Tailwind CSS for styling
- Headless UI for components
- Hero Icons
- Vite for fast builds
- PostCSS & Autoprefixer

## Installation

### Prerequisites
- Node.js 18+ and npm

### Quick Start

```bash
# Install dependencies
npm install

# Start development server

## Project Structure

```
d:\Projects\Repo\
├── resources/
│   ├── css/
│   │   └── app.css
│   └── js/
│       ├── app/
│       │   ├── pages/
│       │   │   ├── components/
│       │   │   │   ├── button.jsx
│       │   │   │   ├── card.jsx
│       │   │   │   ├── badge.jsx
│       │   │   │   ├── modal.jsx
│       │   │   │   └── section-title.jsx
│       │   │   └── portfolio/
│       │   │       ├── _redux/
│       │   │       │   ├── portfolio-slice.js
│       │   │       │   ├── portfolio-thunk.js
│       │   │       │   └── theme-slice.js
│       │   │       ├── _sections/
│       │   │       │   ├── hero-section.jsx
│       │   │       │   ├── projects-section.jsx
│       │   │       │   ├── skills-section.jsx
│       │   │       │   ├── experience-section.jsx
│       │   │       │   ├── github-section.jsx
│       │   │       │   └── contact-section.jsx
│       │   │       ├── layout.jsx
│       │   │       └── page.jsx
│       │   ├── services/
│       │   │   └── portfolio-service.js
│       │   └── store/
│       │       └── store.js
│       ├── app.jsx
│       └── bootstrap.js
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── vercel.json
```

## Customization

### Update Portfolio Content

1. **Personal Information**
   - Edit `resources/js/app/pages/portfolio/_sections/hero-section.jsx`

2. **Projects**
   - Edit `resources/js/app/pages/portfolio/_sections/projects-section.jsx`

3. **Skills**
   - Edit `resources/js/app/pages/portfolio/_sections/skills-section.jsx`

4. **Experience**
   - Edit `resources/js/app/pages/portfolio/_sections/experience-section.jsx`

5. **Contact**
   - Edit `resources/js/app/pages/portfolio/_sections/contact-section.jsx`

### Styling

- Global styles: `resources/css/app.css`
- Tailwind config: `tailwind.config.js`

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Select your repository
5. Click "Deploy"

Vercel will automatically detect the Vite configuration and deploy your portfolio!

## License

MIT License

## Credits

- Built with ❤️ using Laravel & React
- Icons by [Heroicons](https://heroicons.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## Support

For issues and questions:
- Create an issue on GitHub
- Email: your.email@example.com

---

**Happy Coding! 🚀**
