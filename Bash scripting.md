Learn Shell/Bash scripting with short tutorials
# Create and execute your first script

1. Create the sh file

```bash
touch first.sh
```

2. Inside the file, add the shebang `#!` and type the command

```bash
#!/bin/bash
echo "My first script in bash"
```

1. Execute the script

```bash
bash first.sh
```

# Execute a command Linux

Is possible to execute Linux commands like `pwd` or `ls -lah` to do this write the following lines inside a bash script file.

2. Declare a variable and print it with the `echo` command to ensure you do it great

```bash
#!/bin/bash
var=`pwd` # or another Linux command
echo "Your current working directory is -> $var"
```
