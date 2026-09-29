# Community Technology Loan

## City of Orlando

Community Technology Loan is a web-based management system designed to help City of Orlando staff manage technology devices, community outreach centers, users, and technology loans.

The project provides a centralized interface for tracking device availability, assignments, maintenance, and loan activity.

---

## Project Overview

The system is being developed as a full-stack application with a responsive web frontend and a RESTful backend.

The frontend provides the user interface used by staff to interact with the technology loan management system.

Future backend development will provide persistent data storage, authentication, REST APIs, and database integration.

---

## Current Features

### Dashboard

- Total device count
- Available devices
- Assigned devices
- Devices under maintenance
- Recent device activity
- Quick actions

### Device Inventory

- View technology devices
- Device status
- Asset tags
- Device type
- Device model
- Assigned outreach center

### Outreach Centers

- View community outreach centers
- Manage center information

### Loans

- View technology loans
- Track assigned devices
- Manage loan activity

### Users

- Staff and system user management

### Settings

- Application configuration

### Authentication

- Staff login interface
- User session handling

---

## Frontend

The current frontend is built using standard web technologies:

- HTML5
- CSS3
- JavaScript
- Git
- GitHub

The application currently uses client-side JavaScript to control navigation and interface behavior.

---

## Project Structure

```text
CommunityTechnologyLoanFrontend/
│
├── .gitignore
├── README.md
├── index.html
│
├── assets/
│
├── css/
│   └── styles.css
│
└── js/
    └── app.js

Running the Frontend

No build system is currently required for the frontend.

Clone the repository:

git clone https://github.com/lmonserratt/CommunityTechnologyLoanFrontend.git

Navigate into the project:

cd CommunityTechnologyLoanFrontend

Open index.html in a web browser.

For local development, the project can also be served using a local HTTP server.

Development Roadmap

The project will be developed in multiple stages.

Phase 1 — Frontend
Responsive user interface
Dashboard
Device inventory
Outreach centers
Loan management
User management
Settings
Navigation

Status: Completed

Phase 2 — Backend

Planned technologies:

Java
Spring Boot
Maven
REST API

Planned functionality:

Device API
User API
Outreach center API
Loan API
Authentication
Validation
Error handling

Status: Planned

Phase 3 — Database

Planned database:

MySQL

Planned entities:

Users
Devices
Outreach Centers
Loans

Status: Planned

Phase 4 — Frontend / Backend Integration

The JavaScript frontend will communicate with the backend through REST API endpoints.

Example:

Frontend
   │
   ▼
REST API
   │
   ▼
Spring Boot
   │
   ▼
MySQL

Status: Planned

Version Control

The project uses Git for version control and GitHub for remote repository management.

Repository:

https://github.com/lmonserratt/CommunityTechnologyLoanFrontend

Current main branch:

main
Author

Luis Augusto Monserratt

Community Technology Loan Project

Project Status

Frontend: Completed

Backend: Planned

Database: Planned

API Integration: Planned

Deployment: Planned
