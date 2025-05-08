This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

### Recommended Node.js Version

This project requires **Node.js 18 or higher** for full compatibility with Next.js 15. It is recommended to use **Node Version Manager (NVM)** to manage your Node.js versions.

#### Installing and Using NVM

1. **Install NVM** (Node Version Manager) by running the following command in your terminal:

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   ```

   After installation, restart your terminal or run the following command to load NVM:

   ```bash
   source ~/.nvm/nvm.sh
   ```

2. **Install Node.js 22**:

   ```bash
   nvm install 22
   ```

3. **Set Node.js 22 as the default version** for this project:

   ```bash
   nvm use 22
   nvm alias default 22
   ```

### Installing PNPM

This project uses **pnpm** for efficient dependency management. Follow these steps to install pnpm:

```bash
npm install -g pnpm
```

### Cloning the Repository and Installing Dependencies

1. **Clone the repository**:

   ```bash
   git clone git@github.com:Soluciones-Kuali/sc-app-backoffice.git
   cd sc-app-backoffice
   ```

2. **Install dependencies with pnpm**:

   ```bash
   pnpm install
   ```

3. **Install Auth.js and generate authentication secret**:

To enable authentication features, install the beta version of `next-auth` (now known as Auth.js), and generate a secure secret:

```bash
npm install next-auth@beta
npx auth secret
```

> This command will automatically create a `.env.local` file containing the `AUTH_SECRET` variable.
> This file is required to successfully start the application with authentication.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```plaintext
personal-gpt/
├── migrations/          # Flyway migrations folder
│   ├── sql/             # SQL scripts for migrations
│   │   └── V1_0_0__create_users_table.sql
│   └── flyway.conf      # Flyway configuration
├── src/                 # Application source code
│   ├── app/             # Pages and routes
│   ├── components/      # Shared components 
│   ├── styles/          # Global styles -- suggested
│   └── tests/           # Unit tests -- suggested
├── Dockerfile           # Docker configuration
├── .env                 # Environment variables (not included in the repository)
└── README.md            # Project documentation

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Flyway and Migrations
Flyway is used to manage database migrations for PostgreSQL. Migration scripts are located in the migrations/sql folder.

### .env File
The .env file located at the project root contains credentials and configuration for Flyway and the application.
There is a env.template file that contains an example of how to add the env variables to your .env file in order to run Flyway migrations.

### Flyway Configuration
The migrations/flyway.conf file contains the Flyway configuration. 
[Optional] - You can update this file if you want to run migrations in a local database. Here is an example:
``` bash
flyway.url=jdbc:postgresql://host.docker.internal:5432/your_database_name
flyway.user=your_database_user
flyway.password=your_database_password
flyway.locations=filesystem:migrations/sql
flyway.schemas=public
```

### Adding a New Migration
	1.	Create a new file in the migrations/sql folder following the naming convention Vx_x_x__description.sql.
	2.	Write the required SQL for the migration.
	3.	Ensure Flyway is correctly configured before running the migrations.

#### Example of a migration:
``` sql
-- V2_0_0__add_email_column.sql
ALTER TABLE Users ADD COLUMN email VARCHAR(100) UNIQUE;
```

### Running Migrations Manually
If you need to run migrations manually:
   1. update the /migrations/flyway.conf file with the database account
   2. Use the following command:
``` bash
docker run --rm \
  -v $(pwd)/migrations:/flyway/migrations \
  -v $(pwd)/migrations/flyway.conf:/flyway/conf/flyway.conf \
  flyway/flyway -configFiles=/flyway/conf/flyway.conf migrate
```

## Docker Deployment

This project is Docker-ready, which allows you to containerize the application and deploy it to platforms like **Google Cloud Run**, **AWS**, or any Docker-compatible environment.

This project includes a Dockerfile that:

	1.	Configures the Next.js application.
	2.	Integrates Flyway to execute migrations before starting the application.

### Building and Running the Docker Container

1. **Build the Docker image**:

   ```bash
   docker build -t personal-gpt .
   ```

   This command creates a Docker image named `personal-gpt` based on the project.

2. **Run the Docker container**:

   ```bash
   docker run -p 8080:8080 personal-gpt
   ```

   This command starts a container from the `personal-gpt` image and maps port 8080 of the container to port 8080 on your local machine.

   > **Note**: The application is configured to run on port 8080 to be compatible with **Google Cloud Run** requirements.

### .dockerignore Cross-Platform Compatibility Notes

If you’re working on an ARM-based environment (such as Apple Silicon), use the docker buildx command to build compatible images:
``` bash
docker buildx build --platform linux/amd64 -t personal-gpt .
```

####  A `.dockerignore` file is included to prevent unnecessary files from being added to the image.

## Deploy 

Check out Next documentation [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for deploy details.
