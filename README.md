# 🩸 BloodBridge — Blood Donation & Donor Management Platform

> **Connecting people. Mobilizing donors. Saving lives.**

BloodBridge is a modern, responsive blood donation platform designed to simplify the process of finding blood donors, creating donation requests, managing donation activities, and coordinating blood donation operations through role-based dashboards.

The platform provides dedicated experiences for **Donors, Volunteers, and Administrators**, while keeping the public donor-search and donation-request discovery experience simple and accessible.

---

## 🌐 Live Project

🔗 **Live Website:** `https://bloodbridge-dzj1.vercel.app/`

💻 **Frontend Repository:** `https://github.com/shawon787-cyber/bloodbridge`

🖥️ **Backend Repository:** `https://github.com/shawon787-cyber/Blood_Bridge_server`

---

## ✨ Why BloodBridge?

Finding a blood donor during an emergency should not be complicated.

BloodBridge focuses on creating a streamlined experience where users can:

* 🩸 Search for suitable blood donors
* 📋 Create and manage blood donation requests
* 🤝 Respond to donation requests
* 📊 Track donation activity
* 👤 Manage personal donor profiles
* 🛡️ Manage users and requests through role-based dashboards
* 💳 Support organizations through funding
* 📱 Access the platform seamlessly from mobile, tablet, and desktop

---

# 🚀 Core Features

## 🏠 Public Website

### Modern Landing Page

* Clean and responsive hero section
* Clear call-to-actions
* "Join as a Donor" flow
* Donor search shortcut
* Featured platform information
* Contact section
* Responsive footer
* Consistent visual language throughout the website

### 🔎 Donor Search

Users can search for donors using:

* Blood group
* District
* Upazila

Search results are displayed only after submitting the search form.

---

# 🩸 Donation Request System

Users can create blood donation requests containing:

* Requester information
* Recipient name
* Recipient district
* Recipient upazila
* Hospital name
* Full address
* Blood group
* Donation date
* Donation time
* Detailed request message

Every new request starts with:

`pending`

Donation requests can move through the following lifecycle:

```text
pending
   ↓
inprogress
   ↓
done
```

or

```text
pending
   ↓
inprogress
   ↓
canceled
```

---

# 👥 Role-Based Dashboard

BloodBridge provides three dedicated user roles.

### 🩸 Donor

Donors can:

* View their dashboard
* Create donation requests
* View their own requests
* Edit requests
* Delete requests
* Respond to pending donation requests
* Complete/cancel an in-progress donation
* View donation history
* Manage their profile

---

### 🤝 Volunteer

Volunteers can:

* View all donation requests
* Filter donation requests
* Update donation status
* Monitor donation activities
* Access dashboard statistics

Volunteers have intentionally restricted permissions compared with administrators.

---

### 🛡️ Admin

Administrators have complete platform management capabilities.

They can:

* View all users
* Block users
* Unblock users
* Promote users to Volunteer
* Promote users to Admin
* Manage all donation requests
* Update donation statuses
* Monitor platform statistics
* View funding information

---

# 📊 Dashboard Experience

The dashboard is designed around a responsive sidebar-based layout rather than a traditional top navbar.

### Dashboard includes

* Personalized welcome section
* Statistics cards
* Donation request management
* User management
* Profile management
* Funding information
* Data visualization
* Responsive tables
* Filtering
* Pagination where applicable

---

# 📈 Data Visualization

The dashboard includes visual statistics to make important platform information easier to understand.

Examples include:

* Total donors
* Total funding
* Total donation requests
* Donation activity trends

Charts are designed to provide quick visual insights without overwhelming the interface.

---

# 👤 Profile Management

Every authenticated user has a dedicated profile page.

Users can view and update:

* Name
* Avatar
* Blood group
* District
* Upazila

The email address remains non-editable.

The profile uses an intentional **Edit → Update → View** workflow to prevent accidental changes.

---

# 💳 Funding

Authenticated users can contribute funds to support the organization.

The funding system includes:

* Funding page
* Funding history
* Donor name
* Fund amount
* Funding date
* Stripe payment integration
* Total funding statistics

---

# 🔐 Authentication & Security

BloodBridge uses secure authentication and protected API communication.

### Authentication features

* Email/password authentication
* JWT-based authentication
* Protected dashboard routes
* Role-based authorization
* Protected private pages
* Protected API requests
* Active/blocked user handling
* Persistent authentication across page reloads

### Security considerations

Sensitive configuration values are stored through environment variables.

```env
NEXT_PUBLIC_API_URL=your_backend_url
```

Database credentials and server-side secrets are kept outside the frontend codebase.

---

# 🧭 Route Structure

### Public Routes

```text
/
├── /login
├── /register
├── /donation-requests
└── /search
```

### Private Routes

```text
/dashboard
/dashboard/profile
/dashboard/create-donation-request
/dashboard/my-donation-requests
/dashboard/all-blood-donation-request
/dashboard/all-users
/dashboard/funding
```

Donation request details are protected and require authentication.

---

# 🎨 Design Philosophy

BloodBridge was designed with a focus on:

* Clean visual hierarchy
* Strong typography
* Balanced whitespace
* Consistent spacing
* Accessible contrast
* Responsive layouts
* Meaningful micro-interactions
* Professional dashboard UI
* Consistent buttons and components
* Equal card dimensions
* Mobile-first responsiveness

The interface intentionally avoids generic template-style layouts and focuses on creating a distinctive visual identity for a healthcare/community platform.

### Visual Direction

```text
Modern
   +
Human-centered
   +
Trustworthy
   +
Minimal
   +
Action-oriented
```

---

# ✨ Motion & Interaction

Subtle animations are used to improve the overall user experience rather than distract from the core functionality.

Examples:

* Scroll reveal animations
* Card entrance animations
* Button micro-interactions
* Modal transitions
* Sidebar transitions
* Page-level transitions
* Dashboard element animations

Animations are kept lightweight and purposeful.

---

# 📱 Responsive Design

BloodBridge is optimized for:

| Device            | Experience                |
| ----------------- | ------------------------- |
| 📱 Mobile         | Fully responsive          |
| 📲 Tablet         | Adaptive layouts          |
| 💻 Desktop        | Full dashboard experience |
| 🖥️ Large screens | Optimized content width   |

Special attention was given to:

* Responsive navigation
* Dashboard sidebar
* Tables
* Forms
* Cards
* Modals
* Search filters
* Charts

---

# 🛠️ Technology Stack

## Frontend

| Technology              | Purpose               |
| ----------------------- | --------------------- |
| ⚛️ React                | UI development        |
| ▲ Next.js               | Application framework |
| 🎨 Tailwind CSS         | Styling               |
| 💎 DaisyUI              | UI components         |
| 🔐 JWT                  | Authentication        |
| 🔗 REST API             | Backend communication |
| 🎞️ Framer Motion / AOS | Animations            |
| 🔔 Sonner               | Toast notifications   |
| 🎯 Lucide React         | Interface icons       |

## Backend

The frontend communicates with a separate REST API built using:

* Node.js
* Express.js
* MongoDB
* JWT

## Payment

* Stripe

## Image Hosting

* ImageBB

---

# 📦 Important NPM Packages

Some of the key packages used in the frontend include:

```text
next
react
react-dom
tailwindcss
daisyui
lucide-react
sonner
framer-motion
```

Additional dependencies may be used depending on the implemented features.

---

# 📂 Frontend Architecture

A simplified structure of the application:

```text
src/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── search/
│   ├── donation-requests/
│   └── ...
│
├── components/
│   ├── shared/
│   ├── home/
│   ├── dashboard/
│   ├── donation/
│   └── ui/
│
├── context/
│   └── ...
│
├── lib/
│   ├── api.js
│   └── ...
│
├── data/
│   └── districts/
│
└── ...
```

The project follows a component-driven approach to keep the UI reusable, maintainable, and scalable.

---

# 🔄 User Journey

### New Donor

```text
Landing Page
     ↓
Register
     ↓
Donor Account
     ↓
Dashboard
     ↓
Search / Create Request
     ↓
Donation Activity
```

### Blood Seeker

```text
Landing Page
     ↓
Donation Requests
     ↓
View Request
     ↓
Login
     ↓
Donate
     ↓
Request → In Progress
```

### Administrator

```text
Login
  ↓
Admin Dashboard
  ↓
Users / Requests / Funding
  ↓
Manage Platform
```

---

# 🧩 Key UX Decisions

### District → Upazila Dependency

Upazila options dynamically depend on the selected district.

This reduces invalid location combinations and makes the registration/search experience easier.

### Donation Status

Donation status is controlled by the application workflow rather than allowing users to manually select arbitrary statuses.

### Protected Actions

Actions such as:

* Creating requests
* Editing requests
* Deleting requests
* Responding to requests
* Managing users

are restricted according to authentication and role permissions.

---

# ⚡ Performance & Reliability

The frontend was developed with production deployment in mind.

Key considerations include:

* Environment-based API configuration
* Responsive image handling
* Reusable components
* API error handling
* Loading states
* Empty states
* Protected route handling
* Persistent authentication
* Production API configuration
* CORS-compatible backend communication

---

# ♿ User Experience

The interface emphasizes:

* Clear labels
* Readable typography
* Consistent controls
* Meaningful feedback
* Confirmation before destructive actions
* Loading indicators
* Empty-state messaging
* Responsive interaction patterns

---

# 🧪 Main Functional Areas

```text
Authentication
      │
      ├── Registration
      ├── Login
      └── Persistent Session
             │
             ▼
       Role Detection
             │
     ┌───────┼────────┐
     ▼       ▼        ▼
   Donor  Volunteer  Admin
     │       │        │
     └───────┼────────┘
             ▼
         Dashboard
             │
   ┌─────────┼──────────┐
   ▼         ▼          ▼
Requests   Profile    Funding
   │
   ▼
Donation Workflow
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

## 2. Navigate to the project

```bash
cd bloodbridge-client
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

## 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🌍 Deployment

The frontend is production-ready and can be deployed on platforms such as:

* Vercel
* Netlify
* Other Next.js-compatible hosting platforms

Make sure the production environment contains the correct backend API URL.

---

# 📌 Assignment Highlights

This project demonstrates practical experience with:

* MERN ecosystem
* Next.js application architecture
* React component design
* REST API integration
* JWT authentication
* Role-based access control
* MongoDB-backed application workflows
* Responsive UI development
* Dashboard design
* Data visualization
* Payment integration
* File/image upload
* Form validation
* Pagination
* Filtering
* Protected routes
* Production deployment

---

# 💡 Future Improvements

Possible future improvements include:

* 🔔 Real-time donation notifications
* 📍 Location-based donor discovery
* 📱 Progressive Web App support
* 💬 Donor/requester communication
* 📊 Advanced analytics
* 🗺️ Map-based donor discovery
* 🤖 AI-powered blood donation assistant
* 📲 Push notifications

---

# 👨‍💻 Developer

**Md Shaon**

Software Developer & Brand Designer

I enjoy building modern, scalable web applications with a strong focus on user experience, clean architecture, and practical problem solving.

### Connect

* 💼 LinkedIn: `https://linkedin.com/in/md-shaon-developer`
* 🌐 Portfolio: `https://tech-agent-shawon-portfolio.netlify.app/`

---

# ⭐ Project

If you find BloodBridge interesting, consider giving the repository a ⭐.

Built with ❤️ to make blood donation coordination simpler, faster, and more accessible.

**BloodBridge — Every connection can make a difference.**
