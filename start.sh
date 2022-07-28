#!/bin/bash

session="Runner"
tmux new-session -d -s $session
window=0
tmux rename-window -t $session:$window $session
tmux send-keys -t $session:$window 'cd ./front-end && sh ./scripts/start.sh' ENTER
tmux split-window 'cd ./back-end && sh ./scripts/start.sh'
tmux attach -t $session
