# Sharpen
### _AI Image Processing SaaS Application_

This repository contains the code for an AI-powered SaaS platform that provides various image processing features, designed to enhance and modify images through advanced AI techniques.

Live site: [Click](https://sharpen-img.vercel.app)

## ✨ Features
---
- **Authentication and Authorization :** Secure user access with registration, login, and route protection.
- **Image Restoration :** Automatically repair and enhance old or damaged images.
- **Recoloring :** Easily customize images by replacing objects with desired colors
- **Object Removal :** Remove unwanted objects or people from photos seamlessly.
- **Generative Filling :** Fill in missing parts or extend the image with AI-generated content
- **Background Removal :** Instantly remove and isolate backgrounds from images.
- **Credits System :** Purchase credits for image transformations

## </> Tech
---
- Next.js
- TypeScript
- Clerk
- Cloudinary
- Shadcn
- TailwindCSS
- Stripe
- MongoDB


## 🚀 Getting Started
---
Follow these steps to set up the project locally on your computer.

Make sure you have the following installed on your computer:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com)

##### Clone the Repository

```bash
git clone https://github.com/mostafijmf/Sharpen.git 
cd sharpen
```

##### Install Dependencies and Run

```bash
npm install
npm run dev
```

##### Set Up Environment Variables
Create a new file named `.env.local` in the root folder.

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MongoDB
NEXT_PUBLIC_MONGODB_URL=

# CLERK Credentials
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_WEBHOOKS_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Cloudinary credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=

# Stripe credentials
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET=
```
