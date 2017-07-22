socat -d -d pty,raw,echo=0 pty,raw,echo=0

echo -n "1" > /dev/pts/25

while :; do clear; echo -n 1 > /dev/pts/23; sleep 0.01; done