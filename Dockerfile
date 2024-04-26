FROM nginx
LABEL maintainer=mwangli

COPY dist/* /usr/share/nginx/html/

RUN mkdir /usr/share/nginx/html/test
COPY src/pages/index.html /usr/share/nginx/html/test/
