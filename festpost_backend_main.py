from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import replicate
import os
import uuid
import base64
import requests
from io import BytesIO

app = FastAPI(title="FestPost - AI Image Generator")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for generated images
generated_images = {}

class ImageRequest(BaseModel):
    business_name: str
    tagline: Optional[str] = ""
    festival: str
    style: Optional[str] = "professional"
    aspect_ratio: Optional[str] = "1:1"

class ImageResponse(BaseModel):
    image_id: str
    image_url: str
    prompt_used: str

# Festival templates with prompts
FESTIVAL_PROMPTS = {
    "diwali": "Beautiful Diwali celebration with diyas, rangoli, fireworks, warm golden lighting, festive atmosphere, {business_name}, {tagline}, professional business poster",
    "christmas": "Festive Christmas scene with decorated tree, snow, warm lights, red and green colors, holiday spirit, {business_name}, {tagline}, professional business poster",
    "new_year": "New Year celebration with fireworks, champagne, gold and silver decorations, midnight celebration, {business_name}, {tagline}, professional business poster",
    "holi": "Vibrant Holi festival with colorful powder, joyful celebration, bright colors, energetic atmosphere, {business_name}, {tagline}, professional business poster",
    "eid": "Elegant Eid celebration with crescent moon, lanterns, Islamic patterns, peaceful atmosphere, {business_name}, {tagline}, professional business poster",
    "valentine": "Romantic Valentine's Day with hearts, roses, soft pink and red colors, love theme, {business_name}, {tagline}, professional business poster",
    "independence_day": "Patriotic Independence Day with national flag, freedom theme, proud celebration, {business_name}, {tagline}, professional business poster",
    "ganesh_chaturthi": "Grand Ganesh Chaturthi with Lord Ganesha, flowers, traditional decorations, spiritual atmosphere, {business_name}, {tagline}, professional business poster",
}

STYLE_MODIFIERS = {
    "professional": "professional, corporate, clean design, modern",
    "vibrant": "vibrant colors, energetic, eye-catching, bold",
    "elegant": "elegant, sophisticated, luxurious, premium",
    "minimal": "minimal, simple, clean, modern aesthetic",
    "traditional": "traditional, cultural, authentic, heritage"
}

@app.get("/")
async def root():
    return {"message": "FestPost API - AI Image Generator", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/festivals")
async def get_festivals():
    """Get list of available festivals"""
    return {
        "festivals": [
            {"id": "diwali", "name": "Diwali", "emoji": "🪔"},
            {"id": "christmas", "name": "Christmas", "emoji": "🎄"},
            {"id": "new_year", "name": "New Year", "emoji": "🎆"},
            {"id": "holi", "name": "Holi", "emoji": "🎨"},
            {"id": "eid", "name": "Eid", "emoji": "🌙"},
            {"id": "valentine", "name": "Valentine's Day", "emoji": "❤️"},
            {"id": "independence_day", "name": "Independence Day", "emoji": "🇮🇳"},
            {"id": "ganesh_chaturthi", "name": "Ganesh Chaturthi", "emoji": "🙏"}
        ]
    }

@app.post("/generate", response_model=ImageResponse)
async def generate_image(request: ImageRequest):
    """Generate festival image using AI"""
    
    try:
        # Get festival prompt template
        if request.festival not in FESTIVAL_PROMPTS:
            raise HTTPException(400, f"Festival '{request.festival}' not supported")
        
        # Build prompt
        festival_prompt = FESTIVAL_PROMPTS[request.festival]
        style_modifier = STYLE_MODIFIERS.get(request.style, STYLE_MODIFIERS["professional"])
        
        # Replace placeholders
        prompt = festival_prompt.format(
            business_name=request.business_name,
            tagline=request.tagline or ""
        )
        
        # Add style
        full_prompt = f"{prompt}, {style_modifier}, high quality, detailed, 8k"
        
        # Determine image dimensions based on aspect ratio
        dimensions = {
            "1:1": {"width": 1024, "height": 1024},  # Instagram square
            "16:9": {"width": 1024, "height": 576},  # Landscape
            "9:16": {"width": 576, "height": 1024},  # Story/Reel
            "4:5": {"width": 1024, "height": 1280},  # Instagram portrait
        }
        
        dims = dimensions.get(request.aspect_ratio, dimensions["1:1"])
        
        # Generate image using Flux via Replicate
        output = replicate.run(
            "black-forest-labs/flux-schnell",
            input={
                "prompt": full_prompt,
                "num_outputs": 1,
                "aspect_ratio": request.aspect_ratio,
                "output_format": "png",
                "output_quality": 100
            }
        )
        
        # Get image URL
        image_url = output[0] if isinstance(output, list) else output
        
        # Generate unique ID
        image_id = str(uuid.uuid4())
        
        # Store metadata
        generated_images[image_id] = {
            "id": image_id,
            "url": image_url,
            "prompt": full_prompt,
            "business_name": request.business_name,
            "festival": request.festival,
            "style": request.style,
            "aspect_ratio": request.aspect_ratio
        }
        
        return ImageResponse(
            image_id=image_id,
            image_url=image_url,
            prompt_used=full_prompt
        )
    
    except Exception as e:
        raise HTTPException(500, f"Error generating image: {str(e)}")

@app.get("/images/{image_id}")
async def get_image(image_id: str):
    """Get generated image details"""
    
    if image_id not in generated_images:
        raise HTTPException(404, "Image not found")
    
    return generated_images[image_id]

@app.get("/images")
async def list_images():
    """List all generated images"""
    return {
        "images": list(generated_images.values())
    }
