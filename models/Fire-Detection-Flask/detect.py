from ultralytics import YOLO
import os

model = YOLO("best.pt")

def detect_fire(image_path):
    results = model(image_path)
    result = results[0]
    
    save_path = os.path.join("uploads", "result.jpg")
    result.save(filename=save_path)

    detections = []
    for box in result.boxes:
        cls = int(box.cls[0])
        conf = float(box.conf[0])
        detections.append({"class": cls, "confidence": conf})
    
    return save_path, detections
