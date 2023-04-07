set HOST=root@test
set APP=found-front
scp -r Dockerfile %HOST%:build
scp -r dist %HOST%:build/dist
ssh %HOST% build/build.sh %APP%
