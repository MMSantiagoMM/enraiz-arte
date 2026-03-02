# build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Cloud Run needs to listen on $PORT, which defaults to 8080 if not set.
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Replace 8080 with actual $PORT at runtime for Cloud Run compatibility
CMD ["sh", "-c", "sed -i \"s/8080/${PORT:-8080}/g\" /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
