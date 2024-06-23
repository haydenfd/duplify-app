#!/bin/bash

run_dev() {
  local DIR=$1

  if [ -d "$DIR" ]; then
    echo "Navigating to $DIR and running 'npm run dev'"
    cd "$DIR"
    nohup npm run dev &> /dev/null &  # Run in background and suppress output
    cd - > /dev/null  # Return to the previous directory
  else
    echo "Directory $DIR does not exist"
  fi
}

run_dev "client"
run_dev "server"

echo "Finished running 'npm run dev' in client and server directories"
