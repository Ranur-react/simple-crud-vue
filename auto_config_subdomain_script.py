import subprocess
import os
from datetime import datetime

def run_command(command):
    try:
        result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        if result.returncode != 0:
            print("Error running command: {}".format(command))
            print(result.stderr)
        else:
            print(result.stdout)
    except Exception as e:
        print("Exception running command: {}".format(command))
        print(e)

def backup_apache_config():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    backup_dir = "/etc/apache2/backup_{}".format(timestamp)
    os.makedirs(backup_dir, exist_ok=True)
    run_command("cp -r /etc/apache2/sites-available {}/".format(backup_dir))
    run_command("cp -r /etc/apache2/sites-enabled {}/".format(backup_dir))
    run_command("cp /etc/apache2/apache2.conf {}/".format(backup_dir))
    run_command("cp /etc/apache2/ports.conf {}/".format(backup_dir))
    print("Backup of Apache configuration is saved")

def install_certbot():
    print("Installing Certbot and Apache plugin...")
    run_command("apt update")
    run_command("apt install -y certbot python3-certbot-apache")

def create_apache_config(subdomain, proxy_address):
    config = """
<VirtualHost *:80>
    ServerName {}

    ProxyPreserveHost On
    ProxyPass / {}

    ErrorLog ${{APACHE_LOG_DIR}}/{}_error.log
    CustomLog ${{APACHE_LOG_DIR}}/{}_access.log combined
</VirtualHost>
""".format(subdomain, proxy_address, subdomain, subdomain)
    with open('/etc/apache2/sites-available/{}.conf'.format(subdomain), 'w') as f:
        f.write(config)
    print("Apache configuration file created for {}".format(subdomain))

def enable_site_and_reload(subdomain):
    run_command("a2ensite {}.conf".format(subdomain))
    run_command("systemctl reload apache2")

def obtain_ssl_certificate(subdomain, email):
    print("Obtaining SSL certificate for domain: {}...".format(subdomain))
    run_command("certbot --apache -d {} --non-interactive --agree-tos --email {}".format(subdomain, email))
    print("SSL certificate obtained for {}".format(subdomain))

def main():
    subdomain = "api.numpang.my.id"
    proxy_address = "http://114.7.96.242:3002"
    email = "rahmatnur844@gmail.com"
