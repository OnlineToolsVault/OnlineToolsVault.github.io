# Free Online Tools

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

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Styling**: Vanilla CSS (CSS Variables, Responsive Design)
- **Routing**: React Router DOM
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
   git clone https://github.com/singhsidhukuldeep/Free-Tools.git
   cd free-tools
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
   - Build the production assets with the correct base path (`/Free-Tools/`).
   - Deploy the contents of the `dist` folder to the `gh-pages` branch.

### Manual Build
If you need to build manually for a different hosting provider:
```bash
npm run build
```
The output will be in the `dist/` directory. Note: You may need to adjust the `base` property in `vite.config.js` if deploying to a custom domain or a different path.



This project is licensed under a Proprietary License. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

For the full license terms, please visit: [License Terms](https://github.com/singhsidhukuldeep/Free-Tools?tab=License-1-ov-file)

- 💻 [Project Repository](https://github.com/singhsidhukuldeep/Free-Tools)

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

When a user requests `/Free-Tools/word-counter`, GitHub Pages serves the physical file at `dist/word-counter/index.html` with **HTTP 200 OK**.

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

For detailed implementation notes and changelogs, see the deployment documentation.