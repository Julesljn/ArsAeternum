#!/bin/bash

git add .

read -p "Commit : " commit_message

git commit -m "feat: $commit_message"

git push

echo "Good"
