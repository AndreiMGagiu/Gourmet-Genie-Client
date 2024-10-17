# Gourmet-Genie-Client

Gourmet Genie is a web application that helps users discover recipes based on the ingredients they have at home. It features a search functionality and ingredient matching system to suggest the most relevant recipes for users. Whether you're looking for quick meals or recipes tailored to specific ingredients, Gourmet Genie has you covered.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend](#backend)
- [Installation and Setup](#installation-and-setup)
- [Setup the Rails Backend](#setup-the-rails-backend)
- [Running Locally](#running-locally)

# Features
- Search by Ingredients: Enter the ingredients you have, and Gourmet Genie will find the best matching recipes.
- Recipe Suggestions: View detailed recipe instructions and ingredients.
- User-Friendly Interface: A clean and intuitive UI built with React and styled using Tailwind CSS.
- Prototype Matching System: In this V1 stage of the application, the search algorithm finds recipes that contain some or all of the ingredients you input. It is not yet an exact match system but provides helpful suggestions based on available data.

# Tech Stack
- React: For building interactive UI components and managing state.
- Tailwind CSS: Utility-first CSS framework for styling.
- Framer Motion: For smooth animations and transitions.

# Backend
- Ruby on Rails: Handles API requests and stores recipe data.
- PostgreSQL/MySQL: The database to store recipes and related information

# Installation and Setup
1. Clone the repository:
```bash
git clone git@github.com:AndreiMGagiu/Gourmet-Genie-Client.git
cd gourmet-genie-client
```
2. Install dependencies:
```bash
npm install
```
3.Start the development server:
```bash
npm start
```

# Setup the Rails Backend:
- The instructions for setting up the Ruby on Rails project can be found here:
```bash
https://github.com/AndreiMGagiu/Gourmet-Genie
```

# Running Locally
1. Start the React frontend on port 3000:
```bash
npm start
```
2.Start the Rails backend on port 3001 (or your desired port):
```bash
rails server -p 3001
```
