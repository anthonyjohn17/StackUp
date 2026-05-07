#!/usr/bin/env python3
"""StackUp static preview server.

Owner: John Anthony · https://github.com/anthonyjohn17

Sends no-store headers for local development.
"""
from http.server import HTTPServer, SimpleHTTPRequestHandler


class DevRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    port = 8080
    print(f"Serving StackUp at http://127.0.0.1:{port}/ (no cache)")
    HTTPServer(("", port), DevRequestHandler).serve_forever()
