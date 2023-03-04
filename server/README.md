# Ezrababait Test Backend application

This application is Node.js + Nestjs + MongoDB project.

### Hierarchy

- `README.md` - project description
- `.git` - git repository
- `.gitignore` - list of files ignored by git
- `.dockerignore` - list of files ignored by docker
- `docker-compose.yml` - YML schema for setting up docker containers flow
- `Makefile` - project control via wrapper of shell scripts
- `.eslintrc.json` - ESLint configuration
- `package.json` - the main project configuration with all dependencies, scripts and pathes
- `yarn.lock` - automatically generated file by yarn package manager
- `tsconfig.json` - file with typescrypt configuration
- `src` - directory with all project files
  - `src/api` - directory with all endproints (includes controllers, services, modules, models)
  - `src/guards` - directory with middlewares (guardes in Nestjs)
  - `src/modules` - directory with separated modules
  - `src/utils` - directory with secondary functions
  - `src/main.js` - the main start-server file

### How do I get set up it locally in DEV mode?

- Install the last versions of `node` and `yarn` to your OS
- Go to `/server/src` folder via `cd ./server/src`
- Create `.env` file. Fill fields `PORT`, `DB_URL`, `JWT_SECRET_ACCESS_KEY`, `JWT_SECRET_REFRESH_KEY`
- Install all dependencies via `yarn`
- Run the project via `yarn dev`

---

## In this project set up CI/CD flow

### -MASTER- branch:

##### After the code merges to the master it is automatically deployed.

## Running the app

```bash
# development
$ `yarn dev`

# production mode
$ `yarn start`
```
