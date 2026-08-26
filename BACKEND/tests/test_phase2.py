import unittest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

class TestPhase2VideoInfo(unittest.TestCase):
    @patch('requests.get')
    def test_1_valid_watch_url_successful_metadata(self, mock_get):
        # Mock successful oEmbed response from YouTube
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "title": "Learn React in 100 Seconds",
            "author_name": "Fireship",
            "thumbnail_url": "https://i.ytimg.com/vi/-IEn_5PTTdk/hqdefault.jpg"
        }
        mock_get.return_value = mock_resp

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=-IEn_5PTTdk"})
        
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["videoId"], "-IEn_5PTTdk")
        self.assertEqual(data["title"], "Learn React in 100 Seconds")
        self.assertEqual(data["channel"], "Fireship")
        self.assertEqual(data["thumbnail"], "https://i.ytimg.com/vi/-IEn_5PTTdk/hqdefault.jpg")
        self.assertIsNone(data["duration"])

    @patch('requests.get')
    def test_2_valid_youtu_be_url(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "title": "Shorts & Short Links",
            "author_name": "TestChannel",
            "thumbnail_url": "https://i.ytimg.com/vi/-IEn_5PTTdk/hqdefault.jpg"
        }
        mock_get.return_value = mock_resp

        res = client.post("/api/v1/video-info", json={"url": "https://youtu.be/-IEn_5PTTdk"})
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["videoId"], "-IEn_5PTTdk")

    @patch('requests.get')
    def test_3_valid_shorts_url(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "title": "YouTube Shorts Video",
            "author_name": "ShortsCreator",
            "thumbnail_url": "https://i.ytimg.com/vi/-IEn_5PTTdk/hqdefault.jpg"
        }
        mock_get.return_value = mock_resp

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/shorts/-IEn_5PTTdk"})
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["videoId"], "-IEn_5PTTdk")

    @patch('requests.get')
    def test_4_url_with_query_parameters(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "title": "Video with Query Params",
            "author_name": "QueryChannel",
            "thumbnail_url": "https://i.ytimg.com/vi/-IEn_5PTTdk/hqdefault.jpg"
        }
        mock_get.return_value = mock_resp

        res = client.post("/api/v1/video-info", json={"url": "https://youtu.be/-IEn_5PTTdk?si=HPQ_OmAu6tfzwWq9&t=20s"})
        
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["videoId"], "-IEn_5PTTdk")

    def test_5_invalid_non_youtube_url(self):
        res = client.post("/api/v1/video-info", json={"url": "https://google.com"})
        
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.json()["detail"], "Please enter a valid YouTube URL.")

    def test_6_empty_url(self):
        res = client.post("/api/v1/video-info", json={"url": ""})
        
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.json()["detail"], "Please enter a valid YouTube URL.")

    @patch('requests.get')
    def test_7_metadata_unavailable_404(self, mock_get):
        mock_resp = MagicMock()
        mock_resp.status_code = 404
        mock_get.return_value = mock_resp

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=nonexist123"})
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["detail"], "This video is unavailable, private, or does not exist.")

    @patch('requests.get')
    def test_8_network_server_failure_500(self, mock_get):
        mock_get.side_effect = Exception("Connection error")

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=-IEn_5PTTdk"})
        
        self.assertEqual(res.status_code, 500)
        self.assertEqual(res.json()["detail"], "Unable to process this video right now.")

    @patch('requests.get')
    def test_9_timeout_504(self, mock_get):
        import requests
        mock_get.side_effect = requests.exceptions.Timeout("Read timed out")

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=-IEn_5PTTdk"})
        
        self.assertEqual(res.status_code, 504)
        self.assertEqual(res.json()["detail"], "YouTube request timed out while fetching video details.")

class TestTranscriptLanguages(unittest.TestCase):
    @patch('main.YouTubeTranscriptApi')
    def test_languages_endpoint_success(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'en'
        mock_t.is_translatable = True
        
        mock_trans = MagicMock()
        mock_trans.language_code = 'hi'
        mock_t.translation_languages = [mock_trans]
        
        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.get("/api/v1/transcript/languages?video_id=MFhxShGxHWc")
        self.assertEqual(res.status_code, 200)
        langs = res.json()["languages"]
        codes = {l["code"]: l["available"] for l in langs}
        self.assertTrue(codes["en"])
        self.assertTrue(codes["hi"])

    def test_languages_endpoint_invalid_id(self):
        res = client.get("/api/v1/transcript/languages?video_id=invalid_id_9999")
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.json()["detail"], "Please enter a valid YouTube URL or 11-character video ID.")

    @patch('main.YouTubeTranscriptApi')
    def test_transcript_english_success(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'en'
        mock_snippet = MagicMock()
        mock_snippet.text = "Hello world"
        mock_snippet.start = 0.0
        mock_snippet.duration = 2.5
        mock_t.fetch.return_value = [mock_snippet]
        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "en"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["language"], "en")
        self.assertEqual(data["languageName"], "English")
        self.assertEqual(len(data["segments"]), 1)

    @patch('main.YouTubeTranscriptApi')
    def test_transcript_hindi_translation_success(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'en'
        mock_t.is_translatable = True
        
        mock_trans_info = MagicMock()
        mock_trans_info.language_code = 'hi'
        mock_trans_info.language = 'Hindi'
        mock_t.translation_languages = [mock_trans_info]

        mock_translated_t = MagicMock()
        mock_snippet = MagicMock()
        mock_snippet.text = "नमस्ते दुनिया"
        mock_snippet.start = 0.0
        mock_snippet.duration = 2.5
        mock_translated_t.fetch.return_value = [mock_snippet]
        mock_t.translate.return_value = mock_translated_t

        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "hi"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["language"], "hi")
        self.assertEqual(data["languageName"], "Hindi")

    @patch('main.YouTubeTranscriptApi')
    def test_transcript_spanish_success(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'es'
        mock_t.language = 'Spanish'
        mock_snippet = MagicMock()
        mock_snippet.text = "Hola mundo"
        mock_snippet.start = 0.0
        mock_snippet.duration = 2.5
        mock_t.fetch.return_value = [mock_snippet]
        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "es"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["language"], "es")
        self.assertEqual(data["languageName"], "Spanish")

    @patch('main.YouTubeTranscriptApi')
    def test_requested_language_unavailable(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'en'
        mock_t.is_translatable = False
        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "ko"})
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["detail"], "Korean transcript is not available for this video. Please choose another available language.")

    @patch('main.YouTubeTranscriptApi')
    def test_auto_detect_language(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'fr'
        mock_t.language = 'French'
        mock_snippet = MagicMock()
        mock_snippet.text = "Bonjour"
        mock_snippet.start = 0.0
        mock_snippet.duration = 2.0
        mock_t.fetch.return_value = [mock_snippet]
        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "auto"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["language"], "fr")

    @patch('main.YouTubeTranscriptApi')
    def test_no_transcript_available(self, mock_api_cls):
        from youtube_transcript_api import NoTranscriptFound
        mock_api_inst = MagicMock()
        mock_api_inst.list.side_effect = NoTranscriptFound("MFhxShGxHWc", [], None)
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "en"})
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["detail"], "No transcript is available for this video.")

    @patch('main.YouTubeTranscriptApi')
    def test_transcript_timeout_504(self, mock_api_cls):
        import requests
        mock_api_inst = MagicMock()
        mock_api_inst.list.side_effect = requests.exceptions.Timeout("Connection timed out")
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "en"})
        self.assertEqual(res.status_code, 504)
        self.assertEqual(res.json()["detail"], "Transcript retrieval timed out. Please try again.")

    @patch('main.YouTubeTranscriptApi')
    def test_transcript_query_params_url(self, mock_api_cls):
        mock_api_inst = MagicMock()
        mock_t = MagicMock()
        mock_t.language_code = 'en'
        mock_snippet = MagicMock()
        mock_snippet.text = "Sample"
        mock_snippet.start = 0.0
        mock_snippet.duration = 1.0
        mock_t.fetch.return_value = [mock_snippet]
        mock_api_inst.list.return_value = [mock_t]
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://youtu.be/MFhxShGxHWc?si=abc123xyz&t=45s", "language": "en"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["videoId"], "MFhxShGxHWc")

    @patch('main.YouTubeTranscriptApi')
    def test_transcript_rate_limit_429(self, mock_api_cls):
        from youtube_transcript_api import IpBlocked
        mock_api_inst = MagicMock()
        mock_api_inst.list.side_effect = IpBlocked("MFhxShGxHWc")
        mock_api_cls.return_value = mock_api_inst

        res = client.post("/api/v1/transcript", json={"url": "https://www.youtube.com/watch?v=MFhxShGxHWc", "language": "en"})
        self.assertEqual(res.status_code, 429)
        data = res.json()
        self.assertEqual(data["code"], "YOUTUBE_RATE_LIMITED")
        self.assertEqual(data["retryAfter"], 30)
        self.assertEqual(res.headers.get("retry-after"), "30")

if __name__ == '__main__':
    unittest.main()

