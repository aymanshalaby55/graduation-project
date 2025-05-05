from flask import Flask, request, jsonify, send_file
from detect import detect_fire
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/detect', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify(success=False, error="No file uploaded"), 400

    file = request.files['file']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    result_path, detections = detect_fire(file_path)

    fire_detected = len(detections) > 0  

    return jsonify({
        "success": fire_detected,
        "detections": detections,
        "result_image": f"/result" if fire_detected else None
    })

@app.route('/result')
def get_result_image():
    return send_file("uploads/result.jpg", mimetype='image/jpeg')

if __name__ == '__main__': 
    app.run(debug=True)
