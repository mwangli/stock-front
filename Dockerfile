FROM nginx
LABEL maintainer=mwangli

COPY dist/* /usr/share/nginx/html/

RUN mkdir /usr/share/nginx/html/test
COPY src/pages/test/* /usr/share/nginx/html/test/
