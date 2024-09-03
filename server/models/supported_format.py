from enum import Enum


class SupportedUploadFormat(Enum):
    PNG = "image/png"
    JPEG = "image/jpeg"
    JPG = "image/jpg"


class SupportedDownloadFormat(Enum):
    PNG = "png"
    JPEG = "jpeg"
    JPG = "jpg"
