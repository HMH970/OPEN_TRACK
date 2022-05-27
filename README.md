# OPEN_TRACK
An App to find karting tracks / schedule track time

# Open Track

## Open Track at a Glance

Open Track is a full stack application That allows Owners/Drivers alike to keep data on track locations and schedules as a collective.

## Application Architecture
Open Track is built on a React frontend with an Express backend, using PostgreSQL as a database, and Redux.

## Backend Overview

Open Track uses an Express server with a PostgreSQL database.

### Backend Technologies Used

**ExpressJS**

Express was an easy choice to make for the Open Track server. The simple data flow from the frontend to the backend with JavaScript at the core of both made for quick, easy development, with little worry about the data types being sent and received.

**PostgreSQL**

PostgreSQL was the database of choice because it is simple to work with, and is easy to manipulate using Sequelize.

**Sequelize**

Sequelize was the ORM of choice for Open Track because of how nicely it integrates with PostgreSQL. All table management and data seeding was handled neatly and simply by way of Sequelize.
