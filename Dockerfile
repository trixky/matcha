#need 16 no 18 of it would no build , python-software-properties is not in 18
FROM ubuntu:16.04

# comment this if the key cannot be receive, it happen sometime 
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update && apt-get install -y --allow-unauthenticated curl python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3
#installing NodeJS
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
# start the database and launch a shell
CMD service postgresql start && sh

EXPOSE 3000
