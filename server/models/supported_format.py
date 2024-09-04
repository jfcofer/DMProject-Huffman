from enum import Enum


class SupportedUploadFormat(Enum):
    PNG = "image/png"
    JPEG = "image/jpeg"
    JPG = "image/jpg"
    BMP = "image/bmp"
    TIFF = "image/tiff"


class SupportedDownloadFormat(Enum):
    PNG = "png"
    JPEG = "jpeg"
    JPG = "jpg"
