# Setting up Monitoring for EC2 Instance and Docker Containers with Grafana


Sure, here's a step-by-step guide on setting up monitoring for an EC2 instance running Docker containers using Grafana along with Grafana, Loki, Prometheus, Promtail, Node Exporter, cAdvisor, and InfluxDB:

### Step 1: Access EC2 Instance
1. Connect to your EC2 instance via SSH using your preferred SSH client or terminal.

### Step 2: Install Docker and Docker Compose
1. Update the package index: `sudo apt update`.
2. Install necessary packages to allow apt to use a repository over HTTPS: `sudo apt install apt-transport-https ca-certificates curl software-properties-common`.
3. Add Docker’s official GPG key: `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`.
4. Add the Docker repository to APT sources: `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"`.
5. Update the package index again: `sudo apt update`.
6. Install Docker: `sudo apt install docker-ce`.
7. Install Docker Compose: 
   ```
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### Step 3: Deploy Containers
1. Prepare your `docker-compose.yml` file with configurations for your containers.
2. Deploy containers using Docker Compose: `sudo docker-compose up -d`.

### Step 4: Expose Container Metrics
1. Ensure that each Docker container exposes metrics for monitoring. This typically involves configuring each container to expose metrics endpoints.

### Step 5: Configure Prometheus
1. Update Prometheus configuration (`prometheus.yml`) to scrape metrics from the exposed endpoints of containers. Add relevant scrape_configs for each container.

### Step 6: Configure Node Exporter
1. Ensure that Node Exporter is running on the EC2 instance. It should be collecting system-level metrics automatically.

### Step 7: Configure Grafana Data Sources
1. Access Grafana on your local system via web browser.
2. Log in to Grafana with your credentials.
3. Navigate to Configuration > Data Sources.
4. Click on "Add data source" and select Prometheus.
5. Configure Prometheus data source with the URL `http://localhost:9090`.
6. Similarly, add Loki as a data source using the URL `http://localhost:3100`.

### Step 8: Import Grafana Dashboards
1. Search for relevant Grafana dashboards for monitoring Docker containers and system metrics.
2. Import these dashboards into Grafana by navigating to Dashboards > Manage > Import.
3. Use the dashboard JSON or ID to import.

### Step 9: Set up Promtail
1. Install Promtail on your local system or another server.
2. Configure Promtail to forward logs from your EC2 instance to Loki. Modify Promtail configuration file (`promtail.yaml`) accordingly.

### Step 10: Monitor Containers in Grafana
1. Once everything is configured, navigate to Grafana dashboards to monitor your EC2 instance and Docker containers' metrics and logs.
2. Explore the dashboards and customize them according to your requirements.

That should cover the entire setup process for monitoring your EC2 instance running Docker containers using Grafana and associated tools. Make sure to troubleshoot any issues that arise during the setup process.
