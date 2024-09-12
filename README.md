# Goals.io

**goals.io** is a platform designed to facilitate the users to add and control goals they want to realize during the week. The project features a backend built with Node.js and a dynamic frontend developed using React.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Pre Requisites](#pre-requisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Example](#example)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Add Weekly Goals**: Users can create and specify their goals for the week.
- **Mark Goals as Complete**: Once a goal is accomplished, users can mark it as completed.
- **View Completed Goals**: A dedicated section displays all the goals that have been completed during the week.
- **Track Progress**: The app provides an overview of how many goals have been completed vs. how many are still pending.

## Tecnologies
- Frontend: [React/TypeScript]
- Backend: [Node.js]
- Database: [PostgreSQL]

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 20 or higher)
- **npm** or **yarn**
- **PostgreSQL** (or another supported database)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ama.git
   cd ama
   ```

2. **Backend setup (NODE.js)**:
   ```bash
   cd go
   ```

   - Navigate to the server directory:
    ```bash
    cd server
    ```

  - Install dependencies:
    ```bash
    yarn
    ```
  - Set up your database and environment variables:
    ```bash
    cp .env.example .env
    ```
  - Run docker to generate the database locally
    ```bash
    docker compose up -d
    ```
  - Once we are using `drizzle` as our ORM library. You'll need to run some commands
    ```bash
    npx drizzle-kit generate
    ``` 
  - Run the database migrations using a `drizzle` command.
    ```bash
    npx drizzle-kit migrate
    ```
  - (Optional) Run the command to generate values to avoid an empty database `seed`
    ```base
    yarn seed
    ```
  - Run the backend server:
    ```bash
    yarn dev
    ```
3. **Frontend Setup (React)**:

    Navigate to the web directory:
    ```bash
    cd web
    ```
    Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
    Run the development server:
    ```bash
    npm dev
    # or
    yarn dev
    ```

## Usage

Once the installation is complete, you can access the **goals.io** platform via your browser:

- **Backend**: Runs on `http://localhost:3333` (or your configured port).
- **Frontend**: Runs on `http://localhost:5173`.

### Example

1. **Create a new goal**: With the project running and at the home page you can click at the button and fill all the fields to create a new goal.
2. **Check the created goals**: Check your goal list ready to be mark as achieved
3. **Mark a goal as achieved**: By clicking in the desired goal you will mark it as achieved
4. **Mark a goal as unachieved**: Undo you previous action by clicking at the `undo` button placed aside of the achieved goal.

## Contributing

We welcome contributions to the AMA project! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

Please ensure that your code adheres to the project's coding standards and is well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, suggestions, or need support, please reach out to the project maintainer:

- **Email**: dev.pedrogiorgetti@gmail.com
- **GitHub**: [pedrogiorgetti](https://github.com/pedrogiorgetti)
