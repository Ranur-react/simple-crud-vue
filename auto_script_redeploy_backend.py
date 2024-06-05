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
        "docker stop node2",
        "docker rm node2",
        "docker rmi absekol-api",
        "docker build -t absekol-api Dockerfile-backend",
        "docker run -d --name node2 -p 212:22 -p 3002:3002 absekol-api"
    ]

    for command in commands:
        run_command(command)

if __name__ == "__main__":
    main()
