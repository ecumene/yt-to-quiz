echo "Adding required hosts to /etc/hosts"
grep -qxF '127.0.0.1  yt-to-quiz.localhost' /etc/hosts || echo '127.0.0.1  yt-to-quiz.localhost' >>/etc/hosts
grep -qxF '127.0.0.1  api.yt-to-quiz.localhost' /etc/hosts || echo '127.0.0.1  api.yt-to-quiz.localhost' >>/etc/hosts
