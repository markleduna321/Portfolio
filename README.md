# Developer Portfolio

A modern, interactive developer portfolio built with Laravel 11 and React, featuring dark mode, real-time GitHub integration, and a powerful project showcase.

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

#### Frontend
- React 18
- Redux Toolkit with Thunks
- Inertia.js for SPA experience
- Tailwind CSS for styling
- Headless UI for components
- Hero Icons

#### Backend
- Laravel 11
- PHP 8.2+
- MySQL/PostgreSQL
- RESTful API

#### Build Tools
- Vite for fast builds
- PostCSS & Autoprefixer

## Installation

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL or PostgreSQL

### Setup Steps

1. **Clone the repository**
   ```bash
   cd d:\Projects\Repo
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies**
   ```bash
   npm install
   ```

4. **Environment configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database**
   - Update `.env` with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. **Run migrations** (when database tables are created)
   ```bash
   php artisan migrate
   ```

7. **Build assets**
   ```bash
   npm run dev
   ```

8. **Start the development server**
   ```bash
   php artisan serve
   ```

9. **Visit the application**
   - Open http://localhost:8000 in your browser

## Development

### Running in Development Mode

Terminal 1 - Laravel server:
```bash
php artisan serve
```

Terminal 2 - Vite dev server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
d:\Projects\Repo\
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── PortfolioController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
├── resources/
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   └── portfolio/
│   │   │   │       ├── _redux/
│   │   │   │       │   ├── portfolio-slice.js
│   │   │   │       │   ├── portfolio-thunk.js
│   │   │   │       │   └── theme-slice.js
│   │   │   │       ├── _sections/
│   │   │   │       │   ├── hero-section.jsx
│   │   │   │       │   ├── projects-section.jsx
│   │   │   │       │   ├── skills-section.jsx
│   │   │   │       │   ├── experience-section.jsx
│   │   │   │       │   ├── github-section.jsx
│   │   │   │       │   └── contact-section.jsx
│   │   │   │       ├── layout.jsx
│   │   │   │       └── page.jsx
│   │   │   ├── components/
│   │   │   │   ├── button.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── modal.jsx
│   │   │   │   └── section-title.jsx
│   │   │   ├── services/
│   │   │   │   └── portfolio-service.js
│   │   │   └── store/
│   │   │       └── store.js
│   │   ├── app.jsx
│   │   └── bootstrap.js
│   └── views/
│       └── app.blade.php
├── routes/
│   ├── web.php
│   └── api.php
├── tailwind.config.js
├── vite.config.js
├── package.json
└── composer.json
```

## Customization

### Update Portfolio Content

1. **Personal Information**
   - Edit `resources/js/app/pages/portfolio/_sections/hero-section.jsx`
   - Update name, title, and description

2. **Projects**
   - Edit `resources/js/app/pages/portfolio/_sections/projects-section.jsx`
   - Modify the `projects` array with your own projects

3. **Skills**
   - Edit `resources/js/app/pages/portfolio/_sections/skills-section.jsx`
   - Update `skillCategories` array

4. **Experience**
   - Edit `resources/js/app/pages/portfolio/_sections/experience-section.jsx`
   - Update `experiences` and `education` arrays

5. **Contact Information**
   - Edit `resources/js/app/pages/portfolio/_sections/contact-section.jsx`
   - Update `contactInfo` and `socialLinks` arrays

### Styling

- Global styles: `resources/css/app.css`
- Tailwind configuration: `tailwind.config.js`
- Custom colors and theme in Tailwind config

### Adding New Sections

1. Create a new section component in `resources/js/app/pages/portfolio/_sections/`
2. Import and add it to `resources/js/app/pages/portfolio/page.jsx`
3. Add navigation link in `resources/js/app/pages/portfolio/layout.jsx`

## Features to Implement

### Optional Enhancements

1. **Database Integration**
   - Create Project, Skill, Experience models
   - Migrations for portfolio data
   - Admin panel for content management

2. **GitHub API Integration**
   - Real-time repository data
   - Contribution graph from GitHub
   - Automated project imports

3. **Blog System**
   - Markdown blog posts
   - Categories and tags
   - Code syntax highlighting

4. **Analytics**
   - Visitor tracking
   - Project view statistics
   - Contact form analytics

5. **Email Notifications**
   - Contact form submissions
   - Newsletter subscription

## API Endpoints

- `GET /` - Main portfolio page
- `GET /api/portfolio` - All portfolio data
- `GET /api/projects` - List of projects
- `GET /api/skills` - Skills data
- `GET /api/experiences` - Experience data
- `GET /api/github-activity` - GitHub activity
- `POST /api/contact` - Send contact message

## Environment Variables

```env
APP_NAME=DeveloperPortfolio
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=

# Mail (for contact form)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# GitHub (optional)
GITHUB_USERNAME=yourusername
GITHUB_TOKEN=your_github_token
```

## Deployment

### Production Build

1. Set environment to production in `.env`:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

2. Build assets:
   ```bash
   npm run build
   ```

3. Optimize Laravel:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

### Hosting Recommendations

- **Vercel/Netlify**: For static frontend
- **Laravel Forge**: For full-stack deployment
- **DigitalOcean**: VPS option
- **AWS/Azure**: Enterprise options

## Troubleshooting

### Common Issues

1. **Vite not building**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear cache: `npm cache clean --force`

2. **Inertia errors**
   - Clear Laravel cache: `php artisan cache:clear`
   - Rebuild assets: `npm run build`

3. **Database connection errors**
   - Verify database credentials in `.env`
   - Ensure database server is running

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open-sourced software licensed under the MIT license.

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
