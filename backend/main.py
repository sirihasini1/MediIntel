from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import shutil

from ocr import extract_text
from ai_summary import generate_medicine_summary

from database import conn, cursor

from auth_db import (
    conn as auth_conn,
    cursor as auth_cursor
)

from auth import (
    hash_password,
    verify_password,
    create_access_token
)

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD ML MODEL
# =========================

model = joblib.load("heart_model.pkl")

# =========================
# MODELS
# =========================

class HeartData(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


class RegisterData(BaseModel):
    name: str
    email: str
    password: str


class LoginData(BaseModel):
    email: str
    password: str


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "MediIntel AI Backend Running"
    }


# =========================
# REGISTER
# =========================

@app.post("/register")
def register(user: RegisterData):

    auth_cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (user.email,)
    )

    existing = auth_cursor.fetchone()

    if existing:

        return {
            "message": "User already exists"
        }

    hashed_password = hash_password(
        user.password
    )

    auth_cursor.execute(
        """
        INSERT INTO users
        (
            name,
            email,
            password
        )
        VALUES (?, ?, ?)
        """,
        (
            user.name,
            user.email,
            hashed_password
        )
    )

    auth_conn.commit()

    return {
        "message": "Registration successful"
    }


# =========================
# LOGIN
# =========================

@app.post("/login")
def login(user: LoginData):

    auth_cursor.execute(
        "SELECT * FROM users WHERE email=?",
        (user.email,)
    )

    db_user = auth_cursor.fetchone()

    if not db_user:

        return {
            "message": "Invalid credentials"
        }

    valid = verify_password(
        user.password,
        db_user[3]
    )

    if not valid:

        return {
            "message": "Invalid credentials"
        }

    token = create_access_token({

        "user_id": db_user[0],

        "email": db_user[2]
    })

    return {

        "access_token": token,

        "name": db_user[1]
    }


# =========================
# HEART DISEASE PREDICTION
# =========================

@app.post("/predict")
def predict(data: HeartData):

    input_data = np.array([[

        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal

    ]])

    prediction = model.predict(
        input_data
    )

    result = (

        "Heart Disease Detected"

        if prediction[0] == 1

        else "No Heart Disease"
    )

    return {
        "prediction": result
    }


# =========================
# PRESCRIPTION OCR + NLP
# =========================

@app.post("/upload-prescription")
async def upload_prescription(
    file: UploadFile = File(...)
):

    try:

        file_path = f"uploads/{file.filename}"

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        extracted_text = extract_text(
            file_path
        )

        ai_summary = generate_medicine_summary(
            extracted_text
        )

        diagnosis = ai_summary.get(
            "diagnosis",
            "Not detected"
        )

        medicines_count = len(
            ai_summary.get(
                "medicines",
                []
            )
        )

        tests_count = len(
            ai_summary.get(
                "tests",
                []
            )
        )

        cursor.execute(
            """
            INSERT INTO prescriptions
            (
                diagnosis,
                medicines_count,
                tests_count
            )
            VALUES (?, ?, ?)
            """,
            (
                diagnosis,
                medicines_count,
                tests_count
            )
        )

        conn.commit()

        return {

            "extracted_text":
            extracted_text,

            "ai_summary":
            ai_summary
        }

    except Exception as e:

        return {
            "error":
            str(e)
        }


# =========================
# PRESCRIPTION HISTORY
# =========================

@app.get("/history")
def get_history():

    cursor.execute(
        """
        SELECT *
        FROM prescriptions
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()

    history = []

    for row in rows:

        history.append({

            "id": row[0],

            "diagnosis": row[1],

            "medicines_count": row[2],

            "tests_count": row[3],

            "created_at": row[4]
        })

    return history