import subprocess

def run_command(command):
    """Run a shell command and print its output."""
    result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    if result.returncode != 0:
        print("Error running command: {}".format(command))
        print(result.stderr)
    else:
        print(result.stdout)
    return result

def main():
    commands = [
        "git pull",
        "docker stop node3",
        "docker rm node3",
        "docker rmi vue-service",
        "docker build -t vue-service .",
        "docker run -d --name node3 -p 213:22 -p 83:83 vue-service"
    ]

    for command in commands:
        run_command(command)

if __name__ == "__main__":
    main()
