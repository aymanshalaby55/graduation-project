import cv2
import numpy as np
from ultralytics import YOLO
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

model = YOLO('yolov8n.pt') 

def process_video(video_path):
    video = cv2.VideoCapture(video_path)

    if not video.isOpened():
        return None

    human_detected = False
    output_path = f"processed_{os.path.basename(video_path)}"
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = int(video.get(cv2.CAP_PROP_FPS))
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break

        results = model(frame)

        for result in results:
            for box in result.boxes:
                if int(box.cls[0]) == 0: 
                    human_detected = True
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

        out.write(frame)

    video.release()
    out.release()

    if human_detected:
        return output_path
    else:
        os.remove(output_path)
        return "not found"

@app.route('/detect', methods=['POST'])
def detect_video():
    data = request.get_json()
    if not data or 'video_path' not in data:
        return jsonify({"error": "No video path provided"}), 400

    video_path = data['video_path']
    result = process_video(video_path)

    return jsonify({"detected": result != "not found"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
