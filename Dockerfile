FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/proc-sel-seplag

COPY ./dist/proc-sel-seplag/browser /usr/share/nginx/html/proc-sel-seplag

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html/proc-sel-seplag
