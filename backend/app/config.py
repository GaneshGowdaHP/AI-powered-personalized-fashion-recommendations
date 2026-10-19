"""
Configuration management for the Fashion AI backend.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Claude API
    anthropic_api_key: str

    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    cors_origins: str = "http://localhost:3000"

    # Upload
    max_upload_size_mb: int = 10
    upload_dir: str = "./uploads"

    # AI Keys
    replicate_api_token: str = ""

    # Debugging/Testing
    mock_mode: bool = True  # Set to False to use actual Claude API

    @property
    def cors_origins_list(self) -> list[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


settings = Settings()
