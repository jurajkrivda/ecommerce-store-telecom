# 🧪 Front-End Technical Assignment – Telekom App

Welcome! 👋  
This is a **technical assignment** for front-end developer applicants. Your task is to build a small but production-ready web application based on the requirements below. This will help us understand how you approach structure, design, quality, and performance.

---

## 📌 Objective

Build a responsive, modern **e-commerce product catalog** using data from the [FakeStore API](https://fakestoreapi.com/docs). The app should allow users to:

- Browse products in a **grid layout**
- View **product details**
- **Filter products** by price range
- See a responsive design that works on all screen sizes

---

## 🧰 Requirements

### ✅ Tech Stack

You **must** use the following:

- **Next.js** (Latest version)
- **React v18/v19**
- **TypeScript** (Strict mode)
- **Tailwind CSS** for styling
- **shadcn/ui** for reusable components (optional, but encouraged)
- **pnpm** as the package manager
- **FakeStore API** as backend data source
- **Docker** for containerization
- **Vitest** for unit testing
- **Playwright** for some e2e tests, this is not required but nice to have

---

### 🔧 Development Requirements

We are looking for **production-grade quality**, which means:

- Set up a proper **project structure**
- Configure **ESLint**, **Prettier**, and **tsconfig** for code quality
- Use **OpenAPI client generation** to communicate with the API (you can use your preferred tool like `openapi-typescript`, `orval`, etc.)
- Here is link to download your [openapi.json](https://fakestoreapi.com/fakestoreapi.json) file
- Add **basic unit tests** using **Vitest**
- Include a **Dockerfile** to build and run the application locally
- Implement **Next.js caching mechanisms** where applicable

---

### 🎯 Functional Requirements

Your app should have the following pages/features:

1. **Product Listing Page**
   - Grid layout (responsive)
   - Uses API client to fetch and display products
2. **Product Detail Page**
   - Displays information for a selected product
3. **Price Filtering**
   - Filter products based on a min–max price range
4. **Responsive Design**
   - Must look good on both mobile and desktop
5. **Caching**
   - Use caching strategies available in Next.js (e.g., static generation, revalidation)

---

## 🧪 Testing

- Write at least a few **unit tests** with **Vitest**
- **Bonus points** for testing filtering logic, edge cases and some e2e tests in **playwright**

---

## 🐳 Docker

Include a **Dockerfile** that allows the app to be built and run locally. For example:

```bash
docker build -t telekom-app .
docker run -p 3000:3000 telekom-app
```

📬 Questions?

If you got any questions, please contact us at:

📧 tomas1.majer@telekom.sk

Good luck and we look forward to reviewing your work! 🚀
