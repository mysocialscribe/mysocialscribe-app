FROM python:3.9-slim

# Install yt-dlp using pip with system packages override
RUN pip install --break-system-packages yt-dlp

# Create downloads directory
RUN mkdir /downloads
WORKDIR /downloads

# Set default command
ENTRYPOINT ["yt-dlp"]
