import cv2
import easyocr
import os

reader = easyocr.Reader(['en'], gpu=False)


def preprocess_image(image_path):

    image = cv2.imread(image_path)

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    gray = cv2.GaussianBlur(
        gray,
        (3, 3),
        0
    )

    thresh = cv2.threshold(
        gray,
        0,
        255,
        cv2.THRESH_BINARY + cv2.THRESH_OTSU
    )[1]

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    processed_path = os.path.join(
        "uploads",
        "processed_image.png"
    )

    cv2.imwrite(
        processed_path,
        thresh
    )

    return processed_path


def extract_text(image_path):

    processed_image = preprocess_image(
        image_path
    )

    results = reader.readtext(
        processed_image,
        detail=0
    )

    text = "\n".join(results)

    return text