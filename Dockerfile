FROM ruby:2.3.3
RUN apt-get update -qq && apt-get install apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs yarn
RUN gem install bundler
RUN mkdir /app
RUN mkdir /app/client
WORKDIR /app
COPY Gemfile Gemfile.lock /app/
RUN bundle install
COPY package.json yarn.lock /app/
COPY client/package.json client/yarn.lock /app/client/
RUN yarn install --pure-lockfile
COPY . /app