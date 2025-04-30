from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import time
import os
import tempfile

app_fight = Flask(__name__)
CORS(app_fight)

# Load pre-trained cascade classifiers for detecting faces and upper bodies
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
upper_body_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_upperbody.xml')
#gfgf
# Function to detect fight in a video
def detect_fight(video_path):
    # Load video
    cap = cv2.VideoCapture(video_path)
    
    # Variables to track the time taken for detection
    start_time = time.time()
    total_frames = 0
    detected_fight = False

    # Loop through each frame in the video
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert frame to grayscale for better detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the frame
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        # Detect upper bodies in the frame
        upper_bodies = upper_body_cascade.detectMultiScale(gray, 1.1, 4)

        # If both faces and upper bodies are detected, consider it as a fight
        if len(faces) > 0 and len(upper_bodies) > 0:
            detected_fight = True
            break  # No need to check further once a fight is detected

        total_frames += 1

    cap.release()
    cv2.destroyAllWindows()

    # Return "yes" if a fight was detected, "no" otherwise
    if detected_fight:
        return "yes"
    else:
        return "no"

# API endpoint to detect fight in a video
@app_fight.route('/detect_fight', methods=['POST'])
def detect_fight_api():
    # Get the video file from the request
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    video_file = request.files['video']

    if video_file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    # Create a temporary file to save the uploaded video
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
        video_path = tmp_file.name
        video_file.save(video_path)

    try:
        # Call the detect_fight function
        detection_result = detect_fight(video_path)
    finally:
        # Remove the temporary video file
        os.remove(video_path)

    # Return the detection result as JSON
    return jsonify({"fight_detected": detection_result})

# Run the Flask application for fight detection
if __name__ == '__main__':
    app_fight.run(port=5000, debug=True)