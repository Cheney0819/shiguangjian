#!/bin/bash
# Supabase 数据库 SOCKS5 隧道
# 通过 Clash 代理连接 Supabase PostgreSQL

PROXY_HOST="127.0.0.1"
PROXY_PORT="7897"
LOCAL_PORT="5433"
REMOTE_HOST="db.eduljlwmljyuanbxbizp.supabase.co"
REMOTE_PORT="5432"

PID_FILE="$(dirname "$0")/../.tunnel.pid"

start() {
  if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
    echo "隧道已在运行 (PID: $(cat "$PID_FILE"))"
    return 0
  fi

  socat TCP-LISTEN:$LOCAL_PORT,fork,reuseaddr \
    SOCKS5:$PROXY_HOST:$REMOTE_HOST:$REMOTE_PORT,socksport=$PROXY_PORT &
  echo $! > "$PID_FILE"
  echo "隧道已启动 (PID: $!, 端口: $LOCAL_PORT -> $REMOTE_HOST:$REMOTE_PORT)"
}

stop() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill $PID 2>/dev/null; then
      echo "隧道已关闭 (PID: $PID)"
    fi
    rm -f "$PID_FILE"
  else
    echo "隧道未在运行"
  fi
}

status() {
  if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
    echo "隧道运行中 (PID: $(cat "$PID_FILE"), 端口: $LOCAL_PORT)"
  else
    echo "隧道未运行"
  fi
}

case "${1:-start}" in
  start) start ;;
  stop) stop ;;
  restart) stop; sleep 1; start ;;
  status) status ;;
  *) echo "用法: $0 {start|stop|restart|status}" ;;
esac
