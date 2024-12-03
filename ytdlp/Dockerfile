FROM python:3.9-slim

# Install yt-dlp
RUN pip install yt-dlp

# Create downloads directory
RUN mkdir /downloads
WORKDIR /downloads

# Set default command
ENTRYPOINT ["yt-dlp"]
