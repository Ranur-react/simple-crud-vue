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
        "docker stop node1",
        "docker rm node1",
        "docker rmi waweb-api",
        "docker build -t waweb-api .",
        "docker run -d --name node1 -p 211:22 -p 3000:3000 waweb-api"
    ]

    for command in commands:
        run_command(command)

if __name__ == "__main__":
    main()
