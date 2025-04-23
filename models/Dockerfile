FROM python:3.9

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y ffmpeg libsm6 libxext6 && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]

##docker build -t human-detection:latest . 
##ocker run -p 5000:5000 human-detection:latest
