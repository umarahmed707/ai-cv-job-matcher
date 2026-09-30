import json

from fastapi import APIRouter, UploadFile, File, HTTPException

from services.cv_service import (
    extract_pdf_text,
    extract_docx_text,
    analyze_cv_with_ai,
)

from services.matching_service import match_jobs


router = APIRouter(
    prefix="/api/v1/cv",
    tags=["CV"]
)


@router.post("/analyze")
async def analyze_cv(file: UploadFile = File(...)):

    filename = file.filename or ""
    extension = (
        "." + filename.rsplit(".", 1)[1].lower()
        if "." in filename
        else ""
    )

    allowed_extensions = {
        ".pdf",
        ".docx",
    }

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty."
        )

    try:

        if extension == ".pdf":
            cv_text = extract_pdf_text(file_bytes)

        elif extension == ".docx":
            cv_text = extract_docx_text(file_bytes)

        if not cv_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from the uploaded CV."
            )

        analysis = analyze_cv_with_ai(cv_text)

        job_matches = match_jobs(analysis)

        return {
            "success": True,
            "message": "CV analyzed successfully",
            "analysis": analysis,
            "job_matches": job_matches
        }

    except HTTPException:
        raise

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail="AI returned invalid JSON."
        )

    except Exception as error:
        print("CV ANALYSIS ERROR:", repr(error))

        raise HTTPException(
            status_code=500,
            detail="CV analysis failed."
        )