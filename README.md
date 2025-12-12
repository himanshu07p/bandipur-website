# Bandipur House Website

The official digital ecosystem for **Bandipur House**, built with modern web technologies to manage events, clubs, team members, and house resources.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Image Storage:** [Cloudinary](https://cloudinary.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ Features

### 🌍 Public Facing Pages
- **Home**: Dynamic hero section with marquee of upcoming events.
- **Events**: Browse upcoming, live, and completed events.
- **Resources**: Access house resources (implemented as placeholder/structure).
- **Clubs**: View details of Clubs, Committees, Upper House Council (UHC), and Lower House Council (LHC).
- **Team**: Dynamic team page organized by UHC, LHC, and Web Ops Team.

### 🛡️ Admin Dashboard (`/admin`)
A secure, role-based dashboard for managing website content.

- **Authentication**: secure email/password login via Supabase Auth.
- **Role-Based Access Control (RBAC)**:
  - **Superadmin**: Full access, including managing other admin users.
  - **Admin**: Access to manage content (Events, Clubs, Team) but cannot manage other admins.

#### Management Modules
1.  **Events Manager**:
    -   Create, Edit, Delete events.
    -   Set status (Upcoming, Live, Completed).
    -   Upload Event Posters directly to Cloudinary.
    -   Add meeting links and location details.
2.  **Clubs & Entities Manager**:
    -   Manage different entity types: Clubs, UHC, LHC, WebOps, Committees.
    -   Upload Logos/Banners directly to Cloudinary.
    -   Add Secretary/Lead details and contact info.
3.  **Team Manager**:
    -   Manage public team members.
    -   Categories: **Upper House Council**, **Lower House Council**, **Web Ops Team**.
    -   Free-text Position titles (e.g., "Secretary", "Regional Coordinator").
    -   Upload Profile Images.
    -   Reorder members via `order_index`.
4.  **Admins Manager** *(Superadmin Only)*:
    -   Create new Admin accounts.
    -   Assign roles (`admin` or `superadmin`).
    -   Delete admin profiles.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Installation
```bash
git clone <repository_url>
cd bandipur-house
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Database Setup (Supabase)
Run the sql commands found in `supabase_schema.sql` in your Supabase SQL Editor to set up:
- `profiles` table (for admin users & roles).
- `events` table.
- `clubs` table.
- `team_members` table.
- Row Level Security (RLS) policies.

#### Initial Superadmin Setup
Since there is no public sign-up, you must create the first Superadmin manually via SQL:
1.  Create a user in Supabase Auth (Authentication -> Users -> Add User).
2.  Copy the `User UUID`.
3.  Run this SQL:
    ```sql
    INSERT INTO public.profiles (id, email, role, full_name)
    VALUES ('PASTE_USER_UUID', 'your_email@example.com', 'superadmin', 'Your Name');
    ```

### 5. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Project Structure

```
├── app/
│   ├── admin/           # Admin dashboard routes
│   │   ├── dashboard/   # Protected dashboard pages
│   │   └── login/       # Admin login page
│   ├── api/             # API routes (e.g., Cloudinary upload)
│   ├── events/          # Public events page
│   ├── team/            # Public team page
│   └── ...
├── components/
│   ├── admin/           # Admin-specific components (Managers, Layout)
│   ├── shared/          # Shared UI (Navbar, Footer)
│   └── ui/              # Shadcn UI primitives (Button, Card, etc.)
├── lib/
│   ├── supabase/        # Supabase client setup
│   └── cloudinary.ts    # Cloudinary config
├── public/              # Static assets
└── supabase_schema.sql  # Database schema reference
```

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Add the **Environment Variables** (from step 3) in Vercel Project Settings.
4.  Deploy!

---

## 🤝 Contribution Guidelines

1.  **Branching**: Create a new branch for each feature or variation (e.g., `feature/new-page` or `variation/dark-mode`).
2.  **Pull Requests**: Submit PRs for review before merging to `main`.
3.  **Database**: If you modify the schema, update `supabase_schema.sql`.
