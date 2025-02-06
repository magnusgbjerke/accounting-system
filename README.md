![accounting-system-preview-dark](https://github.com/magnusgbjerke/accounting-system-all-in-one/blob/main/accounting-system-preview-dark.png#gh-dark-mode-only)
![accounting-system-preview-light](https://github.com/magnusgbjerke/accounting-system-all-in-one/blob/main/accounting-system-preview-light.png#gh-light-mode-only)

<h3 align="center">Accounting System</h3>

<p align="center">
    <i>Based on Norwegian Bookkeeping Principles.</i>
    <br />
<br />
    <a href="#Introduction"><strong>Introduction</strong></a> ·
    <a href="#Features"><strong>Features</strong></a> ·
    <a href="#Technologies"><strong>Technologies</strong></a> ·
    <a href="#Getting-Started"><strong>Getting Started</strong></a>
</p>

<br/>

## Introduction

<!--- Short description --->

This project is a full-stack web application for an Accounting System, designed to comply with Norwegian Bookkeeping Principles. It showcases both frontend and backend development using React and Spring Boot.

## Features

- Register and registry of vouchers.
- Export of selected rows to Excel.
- Integration tests.

## Technologies

- **Frontend**: NextJS(React, Typescript, TailwindCSS)
- **Backend**: Spring Boot(Maven, Java)
- **API Docs**: Swagger UI and OpenAPI v3
- **DB**: PostgreSQL
- **Deployment**: Docker

## Getting Started

Run locally or with Docker.

### Prerequisites

- Docker Desktop installed.

### Run with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/magnusgbjerke/accounting-system.git
   ```

2. Run Docker Compose Up

   ```bash
   cd accounting-system
   docker compose up -d
   ```

   The app should now be running on [localhost:3000](http://localhost:3000/).

   Swagger UI --> [localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).

   OpenAPI v3 --> [localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs).

   PgAdmin(Web-version) --> [localhost:80](http://localhost:80).

> [!NOTE]  
> If you don’t want to run the entire project as a single package, you can choose to run either the backend or the frontend independently, depending on your preference. Each component has its own README file with details.

## Other important information

- Based on Java 21 and React 18.
- The system is prepopulated with the accounts 1920, 2400, 3000 and 1500 because the account registry page has not been implemented.
- The system is prepopulated with the years 2023, 2024, and 2025 because the year registry page has not been implemented.
- It is not possible to attach images/documents to the vouchers at this moment.
- The frontend components are based on Shadcn [components](https://ui.shadcn.com/). If you dont like the colors/theme, you can change this by changing the settings in globals.css. Also have a look at Shadcn [themes](https://ui.shadcn.com/themes).
