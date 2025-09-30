FROM nginx:stable-alpine

# copiar archivos index y styles
COPY ./dist/ /usr/share/nginx/html/

EXPOSE 80
CMD [ "nginx", "-g","daemon off;"]