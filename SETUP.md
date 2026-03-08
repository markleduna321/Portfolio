# Developer Portfolio - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

```powershell
# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install
```

### Step 2: Setup Environment

```powershell
# Copy environment file
copy .env.example .env

# Generate application key
php artisan key:generate
```

### Step 3: Configure Database (Optional)

Edit `.env` file:
```env
DB_DATABASE=portfolio
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Step 4: Run Development Servers

**Terminal 1 - Laravel:**
```powershell
php artisan serve
```

**Terminal 2 - Vite:**
```powershell
npm run dev
```

### Step 5: Open Browser

Visit: http://localhost:8000

---

## 📝 Customization Quick Guide

### Update Your Information

1. **Name & Title** → `resources/js/app/pages/portfolio/_sections/hero-section.jsx` (Line 27-31)

2. **Projects** → `resources/js/app/pages/portfolio/_sections/projects-section.jsx` (Line 14)

3. **Skills** → `resources/js/app/pages/portfolio/_sections/skills-section.jsx` (Line 12)

4. **Experience** → `resources/js/app/pages/portfolio/_sections/experience-section.jsx` (Line 8)

5. **Contact** → `resources/js/app/pages/portfolio/_sections/contact-section.jsx` (Line 49 & 67)

### Common Commands

```powershell
# Development
npm run dev                 # Start Vite dev server
php artisan serve          # Start Laravel server

# Production
npm run build              # Build for production
php artisan optimize       # Optimize Laravel

# Cache
php artisan cache:clear    # Clear cache
php artisan config:clear   # Clear config cache
```

---

## 🎨 Customizing Styles

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
    primary: {
        500: '#0ea5e9',  // Main color
        600: '#0284c7',  // Darker shade
        // ... customize as needed
    },
}
```

### Dark Mode

Toggle is already implemented! Just click the sun/moon icon in the navigation.

---

## 📦 Project Features

✅ Dark/Light Mode  
✅ Responsive Design  
✅ Interactive Projects with Modals  
✅ Skills Visualization  
✅ GitHub Integration (ready)  
✅ Contact Form  
✅ Smooth Animations  
✅ SEO Friendly  

---

## 🛠️ Tech Stack Used

**Frontend:**
- React 18
- Redux Toolkit
- Tailwind CSS
- Headless UI
- Hero Icons

**Backend:**
- Laravel 11
- Inertia.js
- PHP 8.2+

---

## 📱 Sections Overview

1. **Hero** - Introduction with animated background
2. **Projects** - Showcase your work with screenshots, tech stack, and live demos
3. **Skills** - Visual representation of your expertise
4. **Experience** - Professional timeline
5. **GitHub** - Your open source contributions
6. **Contact** - Get in touch form

---

## 🔧 Troubleshooting

**Issue: Vite not working**
```powershell
rm -r node_modules
npm install
npm run dev
```

**Issue: Laravel errors**
```powershell
php artisan cache:clear
php artisan config:clear
composer dump-autoload
```

**Issue: Database connection**
- Check `.env` database settings
- Ensure MySQL/PostgreSQL is running
- Run `php artisan migrate` if you have migrations

---

## 📚 Need Help?

- Check `README.md` for detailed documentation
- Review code comments in component files
- Laravel docs: https://laravel.com/docs
- React docs: https://react.dev

---

**Made with ❤️ using Laravel & React**
