# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



ci.yml without docker integration 

name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      # -------- Backend --------
      - name: Install backend dependencies
        working-directory: Backend
        run: npm install

      - name: Backend check
        working-directory: Backend
        run: node -v

      # -------- Frontend --------
      - name: Install frontend dependencies
        working-directory: Frontend
        run: npm install

      - name: Build frontend
        working-directory: Frontend
        run: npm run build



building ci pipline with docker 
 name: CI Pipeline

on:
  push:
    branches:
      - main

jobs:
  docker-build-push:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # -------- Backend --------
      - name: Build & push backend image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/todo-backend:latest ./Backend
          docker push ${{ secrets.DOCKER_USERNAME }}/todo-backend:latest

      # -------- Frontend --------
      - name: Build & push frontend image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/todo-frontend:latest ./Frontend
          docker push ${{ secrets.DOCKER_USERNAME }}/todo-frontend:latest
