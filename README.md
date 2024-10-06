# SpaceX

This web application that utilises NASA's Open APIs (https://api.nasa.gov/) to showcase space-related data. It uses a React frontend that communicates with a Node.js backend running Express.

## Table of Contents

- [SpaceX](#spacex)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Backend](#backend)
    - [Technologies](#technologies)
    - [Installation](#installation)
    - [Usage](#usage)
      - [Development](#development)
      - [Production](#production)
      - [Testing](#testing)
  - [Frontend](#frontend)
    - [Technologies](#technologies-1)
    - [Installation](#installation-1)
    - [Usage](#usage-1)
      - [Development](#development-1)
      - [Build](#build)
  - [License](#license)

## Features

The user interface basically has two major pages,

- the Gallery
- the APOD (Astronomy Picture Of the Day).

The Gallery page provide the user the option to search the NASA image library for images, videos and audio assets while the APOD provides the user to view a picture of the day depending on the selected date.

## Backend

### Technologies

- Node
- Express
- TypeScript
- Axios (for data fetching)

### Installation

1. Clone the repository:

```bash
 git clone https://github.com/jelilio/nasa-challenge.git
```

2. Move into the backend directory

```bash
 cd backend
```

3. Install dependencies:

```bash
 npm install
```

### Usage

#### Development

1. Setup .env file in the backend directory and provide the below properties
   ```properties
   APP_NAME=<the app name>
   DEV_NASA_API_KEY=<the nasa api key>
   DEV_NASA_API_URL=<the nasa api url>
   DEV_NASA_IMAGES_API_URL=<the nasa image library api url>
   ```
2. To run the project in development, use the below command:
   ```bash
   npm run start:dev
   ```

#### Production

1. Provide the below key-value properties
   ```properties
   APP_NAME=<the app name>
   PROD_NASA_API_KEY=<the nasa api key>
   PROD_NASA_API_URL=<the nasa api url>
   PROD_NASA_IMAGES_API_URL=<the nasa image library api url>
   ```
2. To run the project in production, use the below command:
   ```bash
   npm run start
   ```

#### Testing

The backend exposes the following endpoints

- Picture of the Day
  ```bash
  curl http://localhost:3000/api/apod/today
  ```
- Image Library Search
  ```bash
  curl http://localhost:3000/api/imagelib/search?q=apollo&page=1&size=10
  ```
- Image Asset Detail
  ```bash
  curl http://localhost:3000/api/imagelib/asset/nasaid
  ```

## Frontend

### Technologies

- React
- TypeScript
- Tailwind CSS
- Axios (for data fetching)

### Installation

1. Clone the repository:

```bash
 git clone https://github.com/jelilio/nasa-challenge.git
```

2. Move into the backend directory

```bash
 cd frontend
```

3. Install dependencies:

```bash
 npm install
```

### Usage

#### Development

1. Setup .env file in the frontend directory and provide the below properties
   ```properties
   VITE_API_BASE_URL=http://localhost:3003/api/
   ```
2. To run the project in development, use the below command:
   ```bash
   npm run dev
   ```

#### Build

1. Provide the below key-value properties
   ```properties
   VITE_API_BASE_URL=http://localhost:3003/api/
   ```
2. To run the project in production, use the below command:
   ```bash
   npm run build
   ```

## License

This project is licensed under the [MIT License](LICENSE).
