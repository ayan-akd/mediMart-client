# MediMart💊 Client

A modern, responsive frontend application for the MediMart e-commerce platform built with **Next.js**, **React**, **Redux**, and **TypeScript**. This client-side application provides an intuitive interface for browsing medicines, managing shopping carts, handling secure checkout with prescription uploads, and tracking orders. The UI is built with a combination of **Tailwind CSS** and **Shadcn** components, offering a sleek, accessible, and responsive user experience.

## 🌐 Live Demo

- Frontend: [MediMart Frontend](https://medimart-akd.vercel.app/)
- Backend API: [MediMart API](https://medi-mart-akd-server.vercel.app/)

## 🔑 Demo Credentials

To explore the admin features, you can use these demo credentials:

```
Email: admin@mail.com
Password: admin123
```

**Note:** This is a demo account. Please be mindful when testing the admin features.

## 📋 Features

- **User Authentication**: Secure login/registration using Next-Auth with JWT.
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop.
- **Theme Support**: Light and dark mode support with next-themes.
- **Product Browsing**: Browse medicines with search, filter, and sort capabilities.
- **Product Details**: View detailed information about medicines including descriptions, pricing, and prescription requirements.
- **Shopping Cart**: Add medicines to cart, update quantities, and remove items.
- **Prescription Upload**: Upload prescriptions for medicines that require them.
- **Checkout Process**: Seamless checkout experience with ShurjoPay integration.
- **Order Tracking**: Track order status from placement to delivery.
- **User Profile**: View and update personal information and address details.
- **Order History**: Review past orders and their details.
- **Admin Dashboard**: Comprehensive admin panel for managing products, orders, and users (admin-only).
- **Form Validation**: Client-side form validation using React Hook Form and Zod.
- **State Management**: Efficient state management with Redux Toolkit and Redux Persist.
- **Animations**: Smooth UI transitions and animations with Framer Motion.
- **Accessibility**: ARIA-compliant components from Radix UI for better accessibility.

## 🛠️ Tech Stack

- **Core**

  - Next.js 15.2
  - React 19
  - TypeScript 5.6

- **State Management**

  - Redux Toolkit
  - Redux Persist

- **UI Components**

  - Shadcn UI
  - Tailwind CSS
  - Framer Motion
  - Lucide React Icons
  - React Icons

- **Form Handling**

  - React Hook Form
  - Zod validation
  - Hookform Resolvers

- **Development Tools**
  - ESLint
  - TypeScript ESLint
  - Autoprefixer
  - PostCSS

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>=18.x.x)
- **npm** or **yarn** or **bun**
- **Git**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayan-akd/mediMart-client.git
   ```

2. Install dependencies:
   ```bash
   cd mediMart-client
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```bash
   NEXT_PUBLIC_BASE_API= <Paste your base API here>
   NEXT_PUBLIC_CLIENT_API=<Paste your client API here>
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

The application will run at http://localhost:3000.

📜 Available Scripts

The project includes several npm scripts for development and production:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase using **ESLint**.
- `npm run create:module`: Creates new module templates using a custom script.

## Routes and Pages

### Customer Routes

- **Home Page** (`/`):
  - Hero section
  - Featured medicines
  - Health tips
  - Customer reviews
  - Newsletter sign up

- **Authentication**:
  - Login with Registration (`/login`)

- **Medicine Browsing**:
  - All Medicines (`/shop`)
  - Medicine Details (`/medicine/:id`)

- **Shopping**:
  - Cart and Checkout (`/cart`)
  - Checkout (`/checkout`)

- **User Account**:
  - Profile (`/dashboard/profile`)
  - Order History (`/dashboard/user/orders`)

### Admin Routes

- **Profile**:
  - Overview of Admin profile (`/dashboard/admin/profile`)

- **Inventory Management**:
  - Medicine Management (`/dashboard/admin/manage-medicines`)

- **Order Management**:
  - Order Management (`/dashboard/admin/manage-orders`)

- **User Management**:
  - User Management (`/dashboard/admin/manage-users`)

- **Payment Verification**:
  - Payment Verification (`/dashboard/admin/manage-payments`)

## Project Structure

```
src/
├── app/
│   ├── (commonLayout)/
│   │   ├── about/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── medicine/
│   │   ├── shop/
│   │   ├── verify-order/
│   ├── (dashboardLayout)/
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   ├── profile/
│   │   │   └── user/
├── assets/
├── components/
│   ├── admin-panel/
│   ├── forms/
│   ├── modules/
│   ├── shared/
│   └── ui/
├── constants/
├── context/
├── hooks/
├── lib/
├── providers/
├── redux/
├── services/
├── types/
└── utils/
└── middleware.ts
```



## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects
- [mediMart-server](https://github.com/ayan-akd/mediMart-server): Backend repository for the e-commerce platform.

## Acknowledgments

- [Vercel](https://vercel.com/) for hosting the application
- [shadcn/ui](https://ui.shadcn.com/) for beautifully designed component templates
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework

Feel free to clone and contribute to this project. If you find any bugs or have suggestions for improvements, feel free to open an issue or pull request!

Happy coding! 💊🚀
