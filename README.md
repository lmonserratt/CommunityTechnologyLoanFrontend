# Community Technology Loan

## City of Orlando

Community Technology Loan is a web-based technology inventory and loan management system designed for City of Orlando staff.

The project is being developed to provide a centralized interface for managing technology devices, outreach centers, users, and technology loans.

---

## Project Purpose

The goal of the Community Technology Loan system is to provide City of Orlando staff with an organized interface for managing technology resources used by community outreach centers.

The application is designed around the following areas:

- Device inventory
- Device availability
- Device assignments
- Outreach centers
- Technology loans
- User management
- Administrative settings

---

## Frontend

The current frontend is a desktop-first web application prototype based on the project's UI/UX design.

### Technologies

- HTML5
- CSS3
- JavaScript
- Git
- GitHub

The frontend currently uses standard HTML, CSS, and JavaScript without a frontend framework.

---

## Current Features

### Authentication

- Staff login interface
- User role display
- Login validation
- Logout functionality
- Session state handling

### Dashboard

- Total Devices
- Available Devices
- Assigned Devices
- Devices in Maintenance
- Recent Device Activity
- Quick Actions

### Device Inventory

The interface supports the planned device inventory workflow, including:

- Asset Tag
- Device Type
- Manufacturer
- Model
- Serial Number
- Status
- Outreach Center
- Device details
- Add Device
- Edit Device

### Outreach Centers

The interface provides a section for managing community outreach center information.

### Loans

The interface provides a section for managing technology loan activity and assigned devices.

### Users

The interface provides a section for staff and user management.

### Settings

The interface provides a section for application settings and configuration.

---

## Current Frontend Structure

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

Clone the repository:

git clone https://github.com/lmonserratt/CommunityTechnologyLoanFrontend.git

Navigate to the project:

cd CommunityTechnologyLoanFrontend

Open index.html in a web browser.

The frontend does not currently require a build system or package manager.

Development Status
Phase 1 — UI/UX Prototype

Status: Completed

The Figma prototype established the application's main user interface, navigation structure, dashboard, inventory workflow, and administrative sections.

Phase 2 — Frontend Implementation

Status: Completed

The Figma design has been translated into an HTML/CSS/JavaScript desktop web interface.

Current implementation includes:

Application layout
Sidebar navigation
Dashboard
Device inventory interface
Outreach Centers section
Loans section
Users section
Settings section
Login interface
Logout behavior
Client-side navigation
Responsive styling
Accessibility-focused HTML structure
Phase 3 — Backend Development

Status: Planned

The frontend will be connected to the project's backend during the integration phase.

Planned functionality includes:

REST API integration
Authentication
Authorization
Device management
User management
Loan management
Outreach center management
Data validation
Error handling
Phase 4 — Database Integration

Status: Planned

The application will eventually use persistent database storage for system data.

Planned data areas include:

Users
Devices
Outreach Centers
Loans
Phase 5 — Full System Integration

Status: Planned

The frontend, backend, security components, and database will be integrated into the final Community Technology Loan application.

Version Control

Git is used for source control and GitHub is used for remote repository management.

Repository:

https://github.com/lmonserratt/CommunityTechnologyLoanFrontend

Main branch:

main
Project Author

Luis Augusto Monserratt

UI/UX and Frontend Development

Community Technology Loan Project

Project Status
Component	Status
UI/UX Design	Completed
Frontend	Completed
Authentication UI	Completed
Client-side Navigation	Completed
Backend	Planned
Database	Planned
REST API Integration	Planned
Full System Integration	Planned