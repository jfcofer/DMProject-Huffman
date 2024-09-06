from io import BytesIO

from models.supported_format import SupportedDownloadFormat
from PIL import Image


class DecompressionService:

    def __init__(self) -> None:
        pass

    def read_compressed_file(self, file: BytesIO):
        content = file.read().decode()

        lines = content.splitlines()
        width, height = map(int, lines[0].split())
        r_length, g_length, b_length = map(int, lines[1].split())

        trees = {"R": [], "G": [], "B": []}
        encoded_data = ""

        current_color = None
        for line in lines[2:]:
            if line in ["R:", "G:", "B:"]:
                current_color = line[0]
            elif ":" in line:
                symbol, code = line.split(":")
                trees[current_color].append((int(symbol), code))
            else:
                encoded_data += line

        r_tree, g_tree, b_tree = trees["R"], trees["G"], trees["B"]
        return (
            (r_tree, g_tree, b_tree),
            encoded_data,
            (width, height),
            (r_length, g_length, b_length),
        )

    def rebuild_huffman_tree(self, huffman_tree):
        decoding_dict = {}
        for symbol, code in huffman_tree:
            decoding_dict[code] = symbol
        return decoding_dict

    def decode_data(self, encoded_data, decoding_dict):
        decoded_data = []
        current_code = []
        for bit in encoded_data:
            current_code.append(bit)
            code_str = "".join(current_code)
            if code_str in decoding_dict:
                decoded_data.append(decoding_dict[code_str])
                current_code = []
        return decoded_data

    def decompress_image(self, file: BytesIO, format: SupportedDownloadFormat):
        (
            (r_tree, g_tree, b_tree),
            encoded_data,
            (width, height),
            (r_length, g_length, b_length),
        ) = self.read_compressed_file(file)

        r_decoding_dict = self.rebuild_huffman_tree(r_tree)
        g_decoding_dict = self.rebuild_huffman_tree(g_tree)
        b_decoding_dict = self.rebuild_huffman_tree(b_tree)

        r_encoded_data = encoded_data[:r_length]
        g_encoded_data = encoded_data[r_length : r_length + g_length]
        b_encoded_data = encoded_data[r_length + g_length :]

        r_decoded = self.decode_data(r_encoded_data, r_decoding_dict)
        g_decoded = self.decode_data(g_encoded_data, g_decoding_dict)
        b_decoded = self.decode_data(b_encoded_data, b_decoding_dict)

        image_data = [(r, g, b) for r, g, b in zip(r_decoded, g_decoded, b_decoded)]

        image = Image.new("RGB", (width, height))
        image.putdata(image_data)

        output = BytesIO()
        image.save(output, format=format.value.upper())
        output.seek(0)
        return output
