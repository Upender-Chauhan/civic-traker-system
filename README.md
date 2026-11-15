# Civic Tracker System

A medium-sized academic full-stack MVP for reporting local civic issues and managing their resolution. This is a classroom demonstration project, not an official government service.

## Stack
- React + Vite + JavaScript + Tailwind CSS
- Express REST API, JWT authentication, bcrypt password hashing
- MongoDB Community Edition + Mongoose
- Multer local image uploads
- Optional Google Maps JavaScript API integration with manual location fallback
- Recharts and Lucide React

## Requirements
- Windows 10/11
- Node.js 18+ and npm
- MongoDB Community Edition running locally
- VS Code or another editor

## Windows setup
1. Install Node.js and MongoDB Community Edition. Start the MongoDB service.
2. Extract this project and open its root folder in VS Code.
3. Copy `.env.example` to `server/.env`. Set a private random `JWT_SECRET` (at least 32 random characters is recommended).
4. Copy `client/.env.example` to `client/.env`. `VITE_GOOGLE_MAPS_API_KEY` can remain blank; manual address and coordinates still work. To use the map, create a Google Cloud project, enable Maps JavaScript API, configure billing as required by Google, create and restrict an API key, and paste it into `client/.env`.
5. In a terminal at the project root run:

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run seed
npm run dev
```

6. Open http://localhost:5173. API health check: http://localhost:5000/api/health.

The root `npm install` installs the `concurrently` runner; the two prefix commands install backend and frontend dependencies. If Windows PowerShell blocks npm scripts, use Command Prompt or adjust the local PowerShell execution policy according to your institution's IT guidance.

## Demo accounts
Run `npm run seed` from the project root after MongoDB is running.

| Role | Email | Password |
|---|---|---|
| Admin | admin@civic.local | Admin@12345 |
| Citizen | amit@civic.local | Citizen@123 |
| Citizen | priya@civic.local | Citizen@123 |
| Staff | roadstaff@civic.local | Staff@12345 |
| Staff | sanitation@civic.local | Staff@12345 |

Change demo passwords and JWT secret before any deployment. Do not expose this demo installation publicly with default credentials.

## Main workflow
1. Citizen registers/logs in and submits a complaint with category, description, address and optional photos/location.
2. Admin reviews the complaint, verifies it, assigns a staff member, or rejects it with a reason.
3. Assigned staff see only their assigned complaints, add remarks, update progress and upload resolution photos when marking resolved.
4. Citizen opens the complaint detail page to view status history, remarks, images and location link.

## API overview
All endpoints are prefixed with `/api`. Protected endpoints require `Authorization: Bearer <JWT>`.

| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public citizen registration |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Authenticated |
| GET/PATCH | `/users/profile` | Authenticated |
| GET | `/users` | Admin |
| POST/GET | `/complaints` | Citizen create; role-filtered list |
| GET | `/complaints/:id` | Owner citizen, assigned staff, admin |
| PATCH | `/complaints/:id/status` | Admin/staff |
| PATCH | `/complaints/:id/assign` | Admin |
| PATCH | `/complaints/:id/reject` | Admin |
| GET | `/staff` | Admin |
| POST | `/staff` | Admin |
| GET | `/staff/complaints` | Staff |
| GET | `/dashboard/:role` | Matching role (admin may inspect dashboard route) |

Complaint image upload field: `images` (max 5, 5 MB each). Resolution upload field: `resolutionImages` (max 5, 5 MB each). Supported formats: JPEG, PNG and WEBP. Files are stored under `server/uploads/` and served from `/uploads/`.

## Google Maps and location fallback
The report form loads a map only when `VITE_GOOGLE_MAPS_API_KEY` is configured. The user can click the map or drag its marker to select coordinates. If no key is configured or the map fails to load, manual address/latitude/longitude fields and browser current-location selection remain available. Google Maps Platform usage may require billing and is subject to Google's pricing, quotas and terms; this project does not promise unlimited or free map usage.

## Project structure
```text
Civic-Tracker-System/
  client/src/{components,context,layouts,pages,services,utils}/
  server/{config,controllers,middleware,models,routes,uploads,utils}/
  docs/
  package.json
  README.md
  .env.example
```

## Important limitations
- No government system integration, SMS/email, push notifications or real-time sockets.
- No production-grade password reset, email verification, audit console, malware scanning or cloud backup.
- JWT is stored in browser localStorage for this academic MVP; production systems should consider secure httpOnly cookies, CSRF protections, stricter validation, logging and deployment hardening.
- Google Maps is optional and requires a user-provided key. Map integration cannot be validated without that key and an eligible Google Cloud project.
- The demo uses local disk uploads; back up the `server/uploads` directory if retaining submitted images.
- This package has not been independently security-audited. Do not use it for real public-service intake without further engineering and privacy review.

## Testing
Start MongoDB, seed the database, then run `npm run dev`. Verify `/api/health`, sign in with each role, create a citizen complaint, assign it as admin, and update it as the assigned staff member. Run `npm run build` from the root to create the production frontend bundle. External Google Maps loading requires a valid key and billing configuration; manual fallback should be used otherwise.
