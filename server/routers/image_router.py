import io

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from models.supported_format import SupportedDownloadFormat, SupportedUploadFormat
from PIL import Image
from services.compression_service import CompressionService
from services.decompression_service import DecompressionService
from starlette.concurrency import run_in_threadpool

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

    file_content = io.BytesIO()
    while chunk := await file.read(1024):
        file_content.write(chunk)
    file_content.seek(0)

    image = await run_in_threadpool(Image.open, file_content)
    compressed_file = await run_in_threadpool(compression_service.compress_image, image)

    def file_chunker(file_obj):
        while chunk := file_obj.read(1024 * 1024):
            yield chunk

    return StreamingResponse(
        file_chunker(compressed_file),
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
    file_content = io.BytesIO()
    while chunk := await file.read(1024):
        file_content.write(chunk)
    file_content.seek(0)

    decompressed_file = decompression_service.decompress_image(file_content, format)

    def file_chunker(file_obj):
        while chunk := file_obj.read(1024 * 1024):
            yield chunk

    return StreamingResponse(
        file_chunker(decompressed_file),
        media_type="image",
        headers={
            "Content-Disposition": f"attachment; filename={file.filename.split('.')[0]}.{format.value}"
        },
    )
