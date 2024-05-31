# Builder stage
FROM python:3.11 AS builder

RUN apt-get update && \
    apt-get install -y curl && \
    curl -1sLf 'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh' | bash && \
    apt-get install -y infisical

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim AS production

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY . .

EXPOSE 5000

# Install infisical in production stage
RUN apt-get update && \
    apt-get install -y curl && \
    curl -1sLf 'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh' | bash && \
    apt-get install -y infisical

# Define build arguments
ARG INFISICAL_API_URL
ARG INFISICAL_TOKEN

# Echo token for debugging purposes
RUN echo $INFISICAL_TOKEN

# Download something random to invalidate the cache (just for the example)
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache

# Run infisical command
RUN infisical secrets --token=$INFISICAL_TOKEN --domain=$INFISICAL_API_URL

CMD ["python", "app.py"]
