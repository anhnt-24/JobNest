#!/bin/sh

echo "🔄 Chờ MinIO khởi động..."
until mc alias set local http://minio:9000 minioadmin minioadmin > /dev/null 2>&1; do
  sleep 2
done

echo "📦 Tạo bucket jobn..."
mc mb local/jobn --ignore-existing

echo "🌍 Set public bucket jobn..."
mc anonymous set public local/jobn

echo "✅ Bucket jobn đã public thành công."
