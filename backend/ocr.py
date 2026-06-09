import requests
import os


API_KEY = os.getenv(
    "OCR_SPACE_API_KEY"
)


def extract_text(image_path):

    with open(
        image_path,
        "rb"
    ) as image_file:

        response = requests.post(
            "https://api.ocr.space/parse/image",
            files={
                "file": image_file
            },
            data={
                "apikey": API_KEY,
                "language": "eng",
                "isOverlayRequired": False
            }
        )

    result = response.json()

    if (
        "ParsedResults" in result
        and len(result["ParsedResults"]) > 0
    ):

        return result[
            "ParsedResults"
        ][0].get(
            "ParsedText",
            ""
        )

    return ""