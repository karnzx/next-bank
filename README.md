# next-bank
An application about the Bank. Deposit - Withdraw - Transfer money between users. (mocked user) build with Nextjs, nodejs, MongoDB, TailwindCSS

### There is not register feature here. use mocked user from script instead.

## mocked user 
```
cd back-end
node scripts/mockUser.js
```

## development
In Linux or WSL easily just run `./start.sh` it will split 2 terminal in tmux and running backend and frontend process
```
./start.sh
```
or use `./start.sh` in scripts directory of both back-end or front-end

### otherwise 
front-end 
- `run yarn dev`

backend-end 
- `docker run -p 27021:27021 -d --name mongodb mongo`
- `yarn dev`

https://user-images.githubusercontent.com/26167071/189367215-d775bb45-728c-4218-a4a2-6a9b5f1aa222.mp4

