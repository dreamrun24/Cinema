# Cinema
# Movie Management Web Application
## Overview
This web application allows you to manage a personal list of movies you’ve watched. You can add, edit, delete, and view movies, with each entry including details such as title, director, release year, genre, and rating.

## Features
- Add Movies: Use the interface to add movies you’ve recently watched.
- Edit Movies: Update any movie’s details (title, rating, release year, etc.) using its Movie ID.
- Delete Movies: Remove movies from your list/database by their Movie ID.
- View All Movies: Display the complete list of movies you’ve added.
- Responsive UI: Works smoothly across desktop, tablet, and mobile devices.
## Technology Stack
- Backend: Express.js + MongoDB
- Frontend: React
## Getting Started
### Prerequisites
- Node.js and npm installed
- MongoDB running locally or accessible remotely
### Installation
1.  Clone the repository:
2.  Install dependencies:
3.  Configure environment variables:
   - Edit backend/.env to set your MongoDB connection string.
4.Seed the database (optional):
5.Start the servers:
   
   - Backend:
   - Frontend: The app will be available at http://localhost:3000/ or http://localhost:3002/ .
## Usage
- Use the “+ Add Movie” button to add new movies.
- Edit or delete movies using the respective buttons on each movie card.
- Navigate using the Discover, Movies, and My List buttons.
- All changes are reflected instantly in the UI.
## Notes
- Make sure to add real details of 5 movies you’ve watched recently.
- You can edit or remove any entry via the interface.
