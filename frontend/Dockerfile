FROM node:20.19
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install react-icons
COPY frontend ./
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
