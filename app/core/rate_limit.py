from fastapi import Request, HTTPException

async def simple_rate_limit(request: Request):
    # Placeholder for future Redis based rate limiting
    return True