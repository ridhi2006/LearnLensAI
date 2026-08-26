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

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=invalid_id_99"})
        
        # Note: 'invalid_id_99' is 13 chars so rejected at URL validation, but if 11 chars non-existent:
        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=nonexist123"})
        self.assertEqual(res.status_code, 404)
        self.assertEqual(res.json()["detail"], "Video metadata is unavailable.")

    @patch('requests.get')
    def test_8_network_server_failure_500(self, mock_get):
        mock_get.side_effect = Exception("Connection timed out")

        res = client.post("/api/v1/video-info", json={"url": "https://www.youtube.com/watch?v=-IEn_5PTTdk"})
        
        self.assertEqual(res.status_code, 500)
        self.assertEqual(res.json()["detail"], "Unable to process this video right now.")

if __name__ == '__main__':
    unittest.main()
