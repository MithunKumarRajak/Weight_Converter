# Deployment Guide: Render + Netlify

## Architecture
- **Render**: Django backend (views, forms, database)
- **Netlify**: Static files CDN (CSS, JS, images) for faster loading

---

## 🚀 Deploy to Render (Backend)

### Step 1: Push to GitHub (Already Done ✓)
```bash
git push origin main
```

### Step 2: Deploy on Render
1. Go to https://dashboard.render.com
2. Sign in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository: `MithunKumarRajak/Weight_Converter`
5. Render will auto-detect `render.yaml`
6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment

### Step 3: Get Your Render URL
After deployment, you'll get a URL like:
```
https://weight-converter-xxxx.onrender.com
```

---

## 🌐 Deploy to Netlify (Static Files CDN)

### Step 1: Deploy Static Files
1. Go to https://app.netlify.com
2. Sign in with GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Select GitHub → Choose `Weight_Converter` repository
5. **Build settings**:
   - Base directory: `staticfiles`
   - Build command: `echo 'Static files ready'`
   - Publish directory: `staticfiles`
6. Click **"Deploy site"**

### Step 2: Get Your Netlify URL
You'll get a URL like:
```
https://your-site-name.netlify.app
```

---

## ⚙️ Configure Django to Use Netlify CDN

### Update settings.py:
Add this to `weight_Converter/settings.py`:

```python
# Static files on Netlify CDN
STATIC_URL = 'https://your-site-name.netlify.app/'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
```

Replace `your-site-name.netlify.app` with your actual Netlify URL.

### Push Changes:
```bash
git add .
git commit -m "Configure Netlify CDN for static files"
git push origin main
```

Render will auto-deploy the update.

---

## 📝 Environment Variables on Render

Set these in Render dashboard (Settings → Environment):

| Variable | Value |
|----------|-------|
| `SECRET_KEY` | Auto-generated |
| `ALLOWED_HOSTS` | `.onrender.com,weight-converter-xxxx.onrender.com` |
| `DEBUG` | `False` |
| `DATABASE_URL` | Auto-configured |

---

## ✅ Verify Deployment

1. **Backend (Render)**: Visit `https://weight-converter-xxxx.onrender.com`
2. **Static Files (Netlify)**: Visit `https://your-site-name.netlify.app/converter/css/style.css`
3. **Full Site**: Backend serves HTML, Netlify serves CSS/JS

---

## 🔄 Continuous Deployment

Both platforms auto-deploy on git push:
```bash
git add .
git commit -m "Update features"
git push origin main
```

✅ Render redeploys backend
✅ Netlify redeploys static files

---

## 📊 Free Tier Limits

**Render Free Tier:**
- 750 hours/month
- 512 MB RAM
- Spins down after 15 min inactivity
- PostgreSQL database included

**Netlify Free Tier:**
- 100 GB bandwidth/month
- Unlimited static hosting
- Instant deploys

---

## 🆘 Troubleshooting

**Issue**: Static files not loading
- **Fix**: Update `STATIC_URL` in settings.py with correct Netlify URL

**Issue**: Render service sleeping
- **Fix**: Use UptimeRobot or similar to ping every 10 minutes

**Issue**: Database errors
- **Fix**: Run migrations on Render shell: `python manage.py migrate`

---

## 🎉 Your URLs

- **Main App (Render)**: https://weight-converter-xxxx.onrender.com
- **Static CDN (Netlify)**: https://your-site-name.netlify.app
- **GitHub Repo**: https://github.com/MithunKumarRajak/Weight_Converter

Enjoy your production-ready Weight Converter! 🚀
