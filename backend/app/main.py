"""
FastAPI application for Fashion AI recommendation system.
"""
import uuid
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.claude_service import ClaudeService
from app.config import settings
from app.models import AnalysisResult, RecommendationRequest, RecommendationResponse
from app.styling_engine import StylingEngine
from app.image_service import ImageGenerationService

app = FastAPI(
    title="Fashion AI Backend",
    description="AI-powered fashion recommendations with Claude Vision + rule-based styling",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Services
claude_service = ClaudeService()
styling_engine = StylingEngine()
image_service = ImageGenerationService()

# In-memory storage for analysis results (use DB in production)
analysis_cache: dict[str, AnalysisResult] = {}

# Ensure upload directory exists
Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "service": "Fashion AI Backend"}


@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_photo(file: UploadFile = File(...)):
    """
    Analyze an uploaded photo using Claude Vision.

    Returns user attributes: body type, skin tone, current style, etc.
    """
    # Validate file type
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Validate file size
    max_size = settings.max_upload_size_mb * 1024 * 1024
    contents = await file.read()
    if len(contents) > max_size:
        raise HTTPException(
            status_code=400, detail=f"File too large (max {settings.max_upload_size_mb}MB)"
        )

    # Save file temporarily
    file_id = str(uuid.uuid4())
    file_ext = Path(file.filename or "image.jpg").suffix
    file_path = Path(settings.upload_dir) / f"{file_id}{file_ext}"

    with open(file_path, "wb") as f:
        f.write(contents)

    try:
        # Analyze with Claude
        analysis_data = await claude_service.analyze_photo(file_path)

        # Create AnalysisResult with the file_id as the ID
        analysis = AnalysisResult(
            id=file_id,
            **analysis_data
        )

        # Cache result
        analysis_cache[file_id] = analysis

        return analysis

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """
    Generate fashion recommendations based on analysis.

    Uses hybrid approach: rule-based styling engine + Claude refinement.
    """
    # Retrieve cached analysis
    analysis = analysis_cache.get(request.analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")

    try:
        # Generate recommendations using styling engine
        recommendation = styling_engine.generate_recommendations(
            analysis=analysis, occasion=request.occasion, season=request.season
        )

        # Create profile summary
        profile_summary = (
            f"{analysis.body_type.capitalize()} body type, "
            f"{analysis.skin_tone} skin tone, "
            f"{analysis.current_style} style aesthetic"
        )

        # Generate realistic image
        recommendation.image_url = await image_service.generate_outfit_image(
            analysis_summary=profile_summary,
            recommendation=recommendation
        )

        return RecommendationResponse(
            recommendations=[recommendation], user_profile_summary=profile_summary
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=settings.host, port=settings.port)
