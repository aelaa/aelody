FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install apt-transport-https
RUN curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn
WORKDIR /srv
COPY Gemfile /srv/Gemfile
COPY Gemfile.lock /srv/Gemfile.lock
RUN bundle install
RUN yarn install
COPY . /srv
