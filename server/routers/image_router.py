import io

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from models.supported_format import SupportedDownloadFormat, SupportedUploadFormat
from PIL import Image
from services.compression_service import CompressionService
from services.decompression_service import DecompressionService

ImageRouter = APIRouter(prefix="/v1/image", tags=["images"])


@ImageRouter.post(path="/compress")
async def compress_image(
    file: UploadFile, compression_service: CompressionService = Depends()
):
    if file.content_type not in SupportedUploadFormat._value2member_map_:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a PNG or JPEG image.",
        )

    image = Image.open(io.BytesIO(await file.read()))
    compressed_file = compression_service.compress_image(image)
    return StreamingResponse(
        compressed_file,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f"attachment; filename={file.filename.split('.')[0]}.huff"
        },
    )


@ImageRouter.post(path="/decompress/{format}")
async def decompress_image(
    format: SupportedDownloadFormat,
    file: UploadFile,
    decompression_service: DecompressionService = Depends(),
):
    compressed_file = io.BytesIO(await file.read())
    decompressed_file = decompression_service.decompress_image(compressed_file, format)
    return StreamingResponse(
        decompressed_file,
        media_type="image",
        headers={
            "Content-Disposition": f"attachment; filename={file.filename.split('.')[0]}.{format.value}"
        },
    )
