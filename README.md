# 🚀 FreeTools (OnlineToolsVault)

<div align="center">
  <a href="https://onlinetoolsvault.com">
    <img src="docs/images/desktop-preview.png" alt="FreeTools Desktop Preview" width="100%" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  </a>

  <h3 align="center">Premium Quality. 100% Free. Privacy Focused.</h3>

  <p align="center">
    A comprehensive suite of developer, PDF, and image tools running entirely in your browser.
    <br />
    <a href="https://onlinetoolsvault.com"><strong>Visit onlinetoolsvault.com »</strong></a>
    <br />
    <br />
    <a href="https://github.com/OnlineToolsVault/OnlineToolsVault.github.io/issues">Report Bug</a>
    ·
    <a href="https://github.com/OnlineToolsVault/OnlineToolsVault.github.io/issues">Request Feature</a>
  </p>

  <p align="center">
    <a href="https://x.com/sourcestrongai" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter">
    </a>
    <a href="https://www.linkedin.com/company/sourcestrongai" target="_blank">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
  </p>
</div>

<br/>

A comprehensive collection of free, secure, and client-side online tools for PDF manipulation, image editing, and more. Built with React, Vite, and modern web technologies.

## 🚀 Features

This project includes a variety of tools that run entirely in the browser, ensuring data privacy and fast performance.

### 📄 PDF Tools
- **PDF to JPG**: Convert PDF pages to high-quality images.
- **JPG to PDF**: Create PDFs from image files.
- **Compress PDF**: Optimize and reduce PDF file size.
- **Merge PDF**: Combine multiple PDF files into one.
- **PDF Editor**: Basic tool to add text and annotations to PDFs.

### 🖼️ Image Tools
- **Background Remover**: Remove image backgrounds automatically using AI (w/ `@imgly/background-removal`).
- **Image Compressor**: Reduce image file size (PNG, JPG, WebP) without quality loss.
- **Image Resizer**: Resize images to specific dimensions.
- **Merge Images**: Combine images horizontally or vertically.

### 🛠️ Utility Tools
- **QR Code Generator**: Create custom QR codes.
- **Word Counter**: Count words and characters in real-time.

<div align="center">
  <img src="docs/images/mobile-preview.png" alt="FreeTools Mobile Preview" width="300" style="border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
</div>

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Styling**: Vanilla CSS (CSS Variables, Responsive Design)
- **Routing**: React Router DOM (v6)
- **SEO**: React Helmet Async
- **Icons**: Lucide React
- **Core Libraries**:
  - `pdfjs-dist` & `pdf-lib` (PDF processing)
  - `browser-image-compression` (Image optimization)
  - `@imgly/background-removal` (AI Background removal)

## ⚠️ Usage Limitations

> [!IMPORTANT]
> The source code is provided for **educational and evaluation purposes only** under the Proprietary License. You may run this project locally to review its functionality, but you are **strictly prohibited** from modifying, distributing, or deploying it for public or commercial use without explicit permission.

## 🏃‍♂️ Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OnlineToolsVault/OnlineToolsVault.github.io.git
   cd OnlineToolsVault.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Development Mode
To start the development server with hot reload:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Preview
To build the project and preview the production build locally:
```bash
npm run build
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) in your browser.

## 🚀 Deployment

The project is already configured for automated deployment to **GitHub Pages** using GitHub Actions.

### Steps to Deploy:
1. **Repository Settings**: In your GitHub repository, go to **Settings > Pages**.
2. **Build and Deployment**: Set **Source** to "GitHub Actions".
3. **Trigger Deployment**: Any push to the `main` branch will trigger the workflow defined in `.github/workflows/deploy.yml`.
4. **Automated Steps**: The workflow will:
   - Install dependencies.
   - Generate the SEO Sitemap.
   - Build the production assets with the correct base path (`/`).
   - Deploy the contents of the `dist` folder to the `gh-pages` branch.

## 📄 License

This project is open-source under the **MIT License**.

For the full license terms, please visit: [License Terms](https://github.com/OnlineToolsVault/OnlineToolsVault.github.io?tab=License-1-ov-file)

- 💻 [Project Repository](https://github.com/OnlineToolsVault/OnlineToolsVault.github.io)

---

## 🏗️ Architecture & Deployment

This project uses a **Multi-Entry SPA** architecture to ensure perfect compatibility with GitHub Pages, Google AdSense, and SEO crawlers.

### The Problem it Solves
GitHub Pages is a static host. By default, visiting a deep link like `/Free-Tools/word-counter` returns a **404 Not Found** because that physical file doesn't exist. This breaks AdSense (which requires HTTP 200 OK) and hurts SEO.

### The Solution: Multi-Entry SPA
During the build process (`npm run build`), we programmatically generate physical directories and `index.html` files for every route:

```text
dist/
├── index.html              (Root entry point)
├── .nojekyll              (Prevents Jekyll processing)
├── 404.html               (Smart fallback for typos)
├── word-counter/
│   └── index.html         (Copy of main index.html)
└── ...
```

When a user requests `/word-counter`, GitHub Pages serves the physical file at `dist/word-counter/index.html` with **HTTP 200 OK**.

### 🛠️ Automated Workflow

We have automated the entire process to prevent errors:

1.  **`npm run validate-routes`**: Checks that every route defined in `src/App.jsx` matches the routes in `generate-sitemap.js`. Runs automatically before build.
2.  **`node generate-sitemap.js`**:
    *   Generates `sitemap.xml`.
    *   Creates the physical folder structure in `dist/`.
    *   Creates `.nojekyll` and `404.html`.
3.  **Use `npm run prepare-deploy`**: Runs the full sequence: Validate → Build → Generate.

### ➕ Adding a New Tool

1.  Add the route in `src/App.jsx`.
2.  Add the route to the `routes` array in `generate-sitemap.js`.
3.  Run `npm run validate-routes` to verify.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://x.com/sourcestrongai">Source Strong AI</a></sub>
</div>