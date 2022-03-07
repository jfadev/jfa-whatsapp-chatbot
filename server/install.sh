#!/usr/bin/env bash

# Jfa Whatsapp Chatbot (by @jfadev)

echo '-> Link Chatbot systemd service...'
sudo rm /etc/systemd/system/wppchatbot.service
sudo ln -s /var/www/wppchatbot/server/etc/systemd/system/wppchatbot.service /etc/systemd/system/wppchatbot.service

echo '-> Start and enable Chatbot systemd service...'
sudo systemctl start wppchatbot
sudo systemctl enable wppchatbot

echo 'Finish!'
