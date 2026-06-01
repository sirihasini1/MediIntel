import cv2
import pytesseract

# Manual Tesseract path
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def preprocess_image(image_path):

    image = cv2.imread(image_path)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Reduce noise
    gray = cv2.GaussianBlur(gray, (3, 3), 0)

    # Improve text visibility
    thresh = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )[1]

    processed_path = "uploads/processed_image.png"

    cv2.imwrite(processed_path, thresh)

    return processed_path


def extract_text(image_path):

    processed_image = preprocess_image(image_path)

    text = pytesseract.image_to_string(processed_image)

    return text