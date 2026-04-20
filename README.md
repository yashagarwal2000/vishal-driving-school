# 🚗 Vishal Driving School — Official Website

> **Live Website:** [vishaldrivingschool.in](https://www.vishaldrivingschool.in) *(coming soon)*  
> **Location:** Chittorgarh, Bhilwara & Nimbahera, Rajasthan, India

A fully responsive, bilingual (English/Hindi) static website for **Vishal Driving School** — Chittorgarh's most trusted driving school run by expert tutor **Bunty Sahu**.

---

## 📸 Preview

![Vishal Driving School](logo.png)

---

## ✨ Features

- **Bilingual** — Full English ↔ Hindi toggle on every section
- **Mobile-first** responsive design with sticky call/WhatsApp/Enroll bar
- **Auto-rolling batch dates** — calculates next batch every 15 days automatically (zero maintenance)
- **Google Form enrollment** — embedded live form with Google Sheets lead tracking
- **Cloudinary media** — instructor photo, gallery images & student testimonial videos via CDN
- **Google Maps** embed with exact school location
- **Google Reviews** section with live star rating display
- **SEO optimized** — LocalBusiness + FAQPage + Course schema, geo meta tags, Open Graph, sitemap & robots.txt
- **Apps Script automation** — Gmail notification + Google Sheets CRM on every enrollment
- **Performance** — lazy loading, resource hints, Google Fonts with `display=swap`
- **WhatsApp integration** — direct chat buttons throughout the page

---

## 🗂️ Project Structure

```
vishal-driving-school/
├── index.html          # Main single-page website (all sections)
├── styles.css          # All styling — responsive, dark theme
├── script.js           # UI logic — lang toggle, counters, FAQ, batch dates
├── apps-script.js      # Google Apps Script — email alerts + Sheets CRM
├── logo.png            # School logo
├── sitemap.xml         # XML sitemap for Google Search Console
├── robots.txt          # Crawler instructions
└── .htaccess           # Apache config — caching, HTTPS redirect, compression
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (no framework) |
| Scripting | Vanilla JavaScript |
| Media CDN | Cloudinary (free tier) |
| Forms | Google Forms + Google Apps Script |
| CRM | Google Sheets (auto-populated) |
| Notifications | Gmail (HTML email) + CallMeBot WhatsApp API |
| Hosting | Hostinger Shared Hosting |
| Analytics | Google Analytics 4 (placeholder) |

---

## 📋 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Full-screen CTA with WhatsApp + enroll buttons |
| 2 | Stats | Animated counters — students, cities, experience |
| 3 | About & Instructor | Bunty Sahu profile + course highlights |
| 4 | Batch Timings | Morning (9–1) & Evening (3–7) slots |
| 5 | Pricing | WagonR ₹4,500 · Swift Dzire & i20 ₹5,000 |
| 6 | Testimonials | 4 student video reviews + Google Reviews embed |
| 7 | Gallery | 6 training photos from Cloudinary CDN |
| 8 | FAQ | 6 questions with schema markup for Google rich results |
| 9 | Location | Google Maps embed — Pratap Nagar, Chittorgarh |
| 10 | Enrollment | Embedded Google Form + WhatsApp direct link |
| 11 | Footer | Links, contact, cities served |

---

## 🚀 Deployment

### Upload to Hostinger
1. Buy **domain** (`vishaldrivingschool.in`) + **Premium Shared Hosting** on [hostinger.in](https://www.hostinger.in)
2. Go to **Hostinger hPanel → File Manager**
3. Upload all files from this repo into the `public_html/` folder
4. SSL activates automatically within 30 minutes
5. Enable HTTPS redirect in `.htaccess` (already prepared — just uncomment)

### Google Apps Script Setup
1. Open the Google Sheet linked to your enrollment form
2. Click **Extensions → Apps Script**
3. Paste the contents of `apps-script.js`
4. Fill in `TUTOR_EMAIL`, `TUTOR_WHATSAPP`, and `CALLMEBOT_API_KEY`
5. Add a trigger: `onFormSubmit` → On form submit

---

## 🔍 SEO Setup (Post-Launch)

1. **Google Search Console** → Add property → Submit `sitemap.xml`
2. **Request Indexing** for the homepage URL
3. **Google Business Profile** → Claim/create listing for Chittorgarh, Bhilwara & Nimbahera
4. **Google Analytics 4** → Replace `G-XXXXXXXX` in `index.html` with real Measurement ID

---

## ⏳ Pending Tasks

- [ ] Add favicon (`favicon.ico` + `apple-touch-icon.png`)
- [ ] Activate Google Analytics 4 (replace placeholder ID)
- [ ] Deploy Apps Script with tutor's Gmail + CallMeBot API key
- [ ] Enable HTTPS redirect in `.htaccess` after SSL activates
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile for all 3 cities

---

## 📞 Contact

**Vishal Driving School**  
KD Shopping Center, First Floor, Pratap Nagar Main Road, Chittorgarh — 312001, Rajasthan  
📞 [+91 7877459724](tel:+917877459724)  
💬 [WhatsApp](https://wa.me/917877459724)

---

*Built with ❤️ for Vishal Driving School, Chittorgarh*
