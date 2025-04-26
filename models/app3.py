from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from ultralytics import YOLO
import tempfile
import os

app_object = Flask(__name__)
CORS(app_object)

# Load the YOLO model
yolo_model = YOLO('yolov8s.pt')  # Replace 'yolov8s.pt' with the path to your YOLO model file

def is_fight_detected(boxes):
    # Placeholder logic for detecting a fight based on the detected bounding boxes
    # For simplicity, consider a fight detected if more than one person is detected
    person_boxes = [box for box in boxes if int(box.cls) == yolo_model.names.index('person')]
    return len(person_boxes) > 1

# Function to detect objects in a video using YOLO
@app_object.route('/detect', methods=['POST'])
def detect_objects():
    # Get the video file from the request
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400

    video_file = request.files.get('video')

    if video_file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    # Create a temporary file to save the uploaded video
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
        video_path = tmp_file.name
        video_file.save(video_path)

    try:
        # Create a video capture object using the video file
        video = cv2.VideoCapture(video_path)
        
        # Check if the video file is opened correctly
        if not video.isOpened():
            return jsonify({'error': 'Failed to open video file'}), 400
        
        # Get the frames per second (FPS) of the video
        fps = video.get(cv2.CAP_PROP_FPS)
        
        # Initialize a frame counter
        frame_count = 0
        
        # List to store information about frames with detected objects
        detected_frames = []
        
        # Process each frame in the video
        while True:
            # Read each frame from the video
            ret, frame = video.read()
            if not ret:
                break
            
            # Perform object detection on the frame using the model
            results = yolo_model(frame)
            
            # Initialize a dictionary to store the frame number, time, and detected objects
            frame_info = {
                'frame_number': frame_count,
                'time': frame_count / fps,  # Calculate the time of the frame
                'objects': []
            }
            
            # Iterate through the results and collect information about detected objects
            for result in results:
                for box in result.boxes:
                    # Get the object type (class name) and confidence
                    object_type = yolo_model.names[int(box.cls)]
                    confidence = float(box.conf)
                    
                    # Add object information to the list for the current frame
                    frame_info['objects'].append({
                        'type': object_type,
                        'confidence': confidence
                    })
            
            # If objects were detected in the frame, add the frame information to the list
            if frame_info['objects']:
                detected_frames.append(frame_info)
            
            # Increment the frame count
            frame_count += 1
        
        
        video.release()
        
        
        response = {
            'total_frames': frame_count,
            'detected_frames': detected_frames  # Include frame number, time, and detected objects in the response
        }
    finally:
        # Remove the temporary video file
        os.remove(video_path)
    
    return jsonify(response)

# Run the Flask application
if __name__ == '__main__':
    app_object.run(debug=True)