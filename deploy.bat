set HOST=root@test
set APP=found-front
scp -r Dockerfile %HOST%:build
ssh %HOST% rm -rf build/dist
scp -r dist %HOST%:build
ssh %HOST% build/build.sh %APP%
