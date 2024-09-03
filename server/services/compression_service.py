import heapq
import io
from collections import Counter

from PIL import Image


class CompressionService:
    def __init__(self) -> None:
        pass

    def get_rgb_data(self, image: Image.Image):
        image = image.convert("RGB")
        r, g, b = image.split()
        return list(r.getdata()), list(g.getdata()), list(b.getdata()), image.size

    def calculate_frequencies(self, channel_data):
        return Counter(channel_data)

    def build_huffman_tree(self, frequencies):
        heap = [[weight, [symbol, ""]] for symbol, weight in frequencies.items()]
        heapq.heapify(heap)
        while len(heap) > 1:
            lo = heapq.heappop(heap)
            hi = heapq.heappop(heap)
            for pair in lo[1:]:
                pair[1] = "0" + pair[1]
            for pair in hi[1:]:
                pair[1] = "1" + pair[1]
            heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
        return sorted(heapq.heappop(heap)[1:], key=lambda p: (len(p[-1]), p))

    # Step 4: Generate Huffman Codes
    def huffman_encoding(self, tree):
        return {symbol: code for symbol, code in tree}

    # Step 5: Encode the Image
    def encode_channel(self, channel_data, huffman_codes):
        return "".join([huffman_codes[pixel] for pixel in channel_data])

    # Step 6: Compress Image using Huffman Coding
    def compress_image(self, image: Image.Image) -> io.BytesIO:
        r_data, g_data, b_data, image_size = self.get_rgb_data(image)

        r_frequencies = self.calculate_frequencies(r_data)
        g_frequencies = self.calculate_frequencies(g_data)
        b_frequencies = self.calculate_frequencies(b_data)

        r_huffman_tree = self.build_huffman_tree(r_frequencies)
        g_huffman_tree = self.build_huffman_tree(g_frequencies)
        b_huffman_tree = self.build_huffman_tree(b_frequencies)

        r_huffman_codes = self.huffman_encoding(r_huffman_tree)
        g_huffman_codes = self.huffman_encoding(g_huffman_tree)
        b_huffman_codes = self.huffman_encoding(b_huffman_tree)

        r_encoded = self.encode_channel(r_data, r_huffman_codes)
        g_encoded = self.encode_channel(g_data, g_huffman_codes)
        b_encoded = self.encode_channel(b_data, b_huffman_codes)

        output = io.BytesIO()
        output.write(f"{image_size[0]} {image_size[1]}\n".encode())
        output.write(f"{len(r_encoded)} {len(g_encoded)} {len(b_encoded)}\n".encode())

        # Save Huffman trees
        for tree, color in zip(
            [r_huffman_tree, g_huffman_tree, b_huffman_tree], ["R", "G", "B"]
        ):
            output.write(f"{color}:\n".encode())
            for symbol, code in tree:
                output.write(f"{symbol}:{code}\n".encode())

        # Save encoded data
        output.write(r_encoded.encode())
        output.write(g_encoded.encode())
        output.write(b_encoded.encode())

        output.seek(0)
        return output
