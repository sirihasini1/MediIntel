import re


def generate_medicine_summary(text):

    medicines = []
    tests = []

    lines = text.split("\n")
    clean_text = text.lower()

    # =========================
    # DIAGNOSIS EXTRACTION
    # =========================

    diagnosis = "Not detected"

    diagnosis_patterns = [

        r"diagnosis\s*[:\-]?\s*(.*)",
        r"current diagnosis\s*(.*)",
        r"known diagnosis\s*(.*)",
        r"complaint[s]?\s*[:\-]?\s*(.*)"
    ]

    for pattern in diagnosis_patterns:

        match = re.search(
            pattern,
            clean_text
        )

        if match:

            diagnosis = (
                match.group(1)
                .split("\n")[0]
                .strip()
            )

            break

    # =========================
    # COMPLAINTS
    # =========================

    complaints = []

    complaint_match = re.search(
        r"complaint[s]?\s*[:\-]?\s*(.*)",
        clean_text
    )

    if complaint_match:

        complaints.append(
            complaint_match.group(1).strip()
        )

    # =========================
    # OBSERVATIONS
    # =========================

    observations = []

    observation_match = re.search(
        r"observation[s]?\s*[:\-]?\s*(.*)",
        clean_text
    )

    if observation_match:

        observations.append(
            observation_match.group(1).strip()
        )

    # =========================
    # MEDICINE EXTRACTION
    # =========================

    medicine_keywords = [

        "tablet",
        "tab",
        "capsule",
        "cap",
        "inhaler",
        "syrup",
        "injection"
    ]

    dosage_pattern = r"\d-\d-\d"

    for i, line in enumerate(lines):

        line_clean = line.strip()

        if any(
            keyword in line_clean.lower()
            for keyword in medicine_keywords
        ):

            dosage = "Not detected"

            duration = "Not detected"

            nearby_text = " ".join(
                lines[i:i+5]
            )

            dosage_match = re.search(
                dosage_pattern,
                nearby_text
            )

            if dosage_match:

                dosage = dosage_match.group()

            duration_match = re.search(
                r"(\d+)\s*day",
                nearby_text.lower()
            )

            if duration_match:

                duration = (
                    duration_match.group(1)
                    + " days"
                )

            medicines.append({

                "name": line_clean,

                "dosage": dosage,

                "duration": duration,

                "instructions": "As prescribed"
            })

    # Remove duplicates

    unique_medicines = []
    seen = set()

    for med in medicines:

        if med["name"] not in seen:

            unique_medicines.append(med)

            seen.add(med["name"])

    medicines = unique_medicines

    # =========================
    # TEST EXTRACTION
    # =========================

    test_keywords = [

        "cbc",
        "lft",
        "rft",
        "covid",
        "pcr",
        "xray",
        "cxr",
        "urine",
        "sputum",
        "usg",
        "creatine",
        "cratine"
    ]

    for line in lines:

        for keyword in test_keywords:

            if keyword in line.lower():

                tests.append(
                    line.strip()
                )

                break

    tests = list(set(tests))

    # =========================
    # REMARKS EXTRACTION
    # =========================

    remarks = "Not detected"

    remarks_match = re.search(
        r"remarks\s*[:\-]?\s*(.*)",
        clean_text
    )

    if remarks_match:

        remarks = (
            remarks_match.group(1)
            .strip()
        )

    # =========================
    # FINAL RESPONSE
    # =========================

    return {

        "diagnosis": diagnosis,

        "complaints": complaints,

        "observations": observations,

        "medicines": medicines,

        "tests": tests,

        "remarks": remarks
    }