# Vision Board
<img width="1920" height="1080" alt="d2" src="https://github.com/user-attachments/assets/2031e08e-a1f5-43d8-9353-1b4134458091" />

A gamified todo list web application built with Next.js, Tailwind CSS, Prisma, and PostgreSQL. Organize tasks into projects and boards, earn XP for completions, and redeem rewards in the Rewards store with timers and notifications.

## Features

- **Public Pages**: Landing page, About page, Footer, and custom Navbar.
- **Protected Dashboard**: Projects, Rewards (store).
- **Hierarchy**: Projects → Boards → Todos (with XP rewards).
- **Gamification**:
  - Earn XP for completing todos/boards.
  - Rewards store: Buy items like "Doom Scroll 15 min"
  - Edit/delete rewards items.
- **Task Management**: Add/edit/delete projects/boards/todos; set positions manually (no drag-and-drop).
- **UI**: Expressive cards, gradients, cel-shading via Tailwind, dark/light mode.
- **Auth**: GitHub sign-in via NextAuth; protected routes.
- **Database**: PostgreSQL with Prisma.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui components.
- **Backend**: Prisma ORM, PostgreSQL.
- **Auth**: NextAuth.
- **Other**: Lucide icons, React Query.

## Installation

1. **Clone the repo**:
   ```
   git clone https://github.com/gyawaliaadim/Vision-Board.git
   cd Vision-Board
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create `.env` file:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   NEXTAUTH_SECRET=your-secret
   GITHUB_ID=your-google-id
   GITHUB_SECRET=your-google-secret
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_HOST="http://localhost:3000"
   NEXT_PUBLIC_API="http://localhost:3000/api" // the port may be different from 3000
   ```

4. **Set up database**:
   ```
   npx prisma generate
   npx prisma db push
   ```

5. **Run the app**:
   ```
   npm run dev
   ```
   Open http://localhost:3000.

## Usage

- **Sign In**: Use GitHub to access protected areas.
- **Projects**: Create projects, add boards, set XP rewards.
- **Boards/Todos**: Add todos to boards; complete to earn XP.
- **Positions**: Manually set order for boards/todos via form inputs.

## Database Schema

See `prisma/schema.prisma` for models:
- User (XP balance)
- Project → Board → Todo (XP reward)
- RewardItem (Rewards items with cost)

All IDs use UUIDs with cascade deletes.

## Best Practices Followed

- Server-side rendering for SEO/performance.
- Dark mode with `next-themes`.
- Responsive design via Tailwind.

## Screenshots

<img width="1920" height="1080" alt="l1" src="https://github.com/user-attachments/assets/5bd993ae-11e4-484e-b75e-fca529c81516" />
<img width="1920" height="1080" alt="l2" src="https://github.com/user-attachments/assets/2356fccd-e96f-4042-9ab9-a129ea643890" />
<img width="1920" height="1080" alt="d1" src="https://github.com/user-attachments/assets/d007fd6f-f9fe-48ba-a180-aa7ed4b49bcb" />
<img width="1920" height="1080" alt="d2" src="https://github.com/user-attachments/assets/df66e485-e47e-4aa0-9c8c-e361d405535c" />
<img width="1920" height="1080" alt="d3" src="https://github.com/user-attachments/assets/830cc915-da28-4d76-9739-54f4f412639f" />


## Contributing

Pull requests welcome! For major changes, open an issue first.

## License

MIT
