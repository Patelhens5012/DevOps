
```markdown
# Ansible Playbook for Installing Node.js and Checking Version

This Ansible playbook automates the installation of Node.js, checks the latest available version from the Node.js website, and verifies the installed version on the local system.

## Update Ansible Playbook

To update the Ansible playbook, follow these steps:

1. Open the `install_node.yml` playbook file.
2. Replace the contents of the file with the updated playbook script provided below:

```yaml
---
- name: Install Node.js and check version
  hosts: localhost
  connection: local
  tasks:
    - name: Install Node.js
      become: yes
      package:
        name: nodejs
        state: present

    - name: Get latest Node.js version
      uri:
        url: "https://nodejs.org/dist/latest/SHASUMS256.txt"
        return_content: yes
      register: latest_version

    - name: Parse latest Node.js version
      set_fact:
        latest_node_version: "{{ latest_version.content | regex_findall('node-v([0-9.]+)-linux-x64.tar.gz') | first }}"

    - name: Get installed Node.js version
      command: "node --version"
      register: installed_version

    - debug:
        msg: 
          - "Latest Node.js version: {{ latest_node_version }}"
          - "Installed Node.js version: {{ installed_version.stdout }}"
```

3. Save the changes to the file.

## Setup Ansible Playbook

To set up the Ansible playbook, follow these steps:

1. Install Ansible on your control node if you haven't already:

   ```bash
   sudo apt update
   sudo apt install ansible
   ```

2. Create a directory for your Ansible project:

   ```bash
   mkdir ansible_node_setup
   cd ansible_node_setup
   ```

3. Create an inventory file named `inventory.yml` with the following content:

   ```yaml
   all:
     hosts:
       localhost:
   ```

4. Create the playbook file `install_node.yml` and paste the updated playbook script into it.

5. Run the playbook using the following command:

   ```bash
   ansible-playbook -i inventory.yml install_node.yml
   ```

   This command will execute the playbook on the localhost, installing Node.js, checking the latest version, and displaying the installed version.

6. Verify Node.js installation and version:

   ```bash
   node --version
   ```

7. Clean up (optional): Remove the playbook file and any temporary files created during setup.

   ```bash
   rm install_node.yml inventory.yml
   ```

That's it! You have successfully updated and set up the Ansible playbook for installing Node.js and checking its version.
