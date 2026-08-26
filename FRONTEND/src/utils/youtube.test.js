import { test } from 'node:test';
import assert from 'node:assert';
import { extractVideoId, isValidYouTubeUrl } from './youtube.js';

// Specific Phase 1 User Test Suite
test('Test Case 1: https://www.youtube.com/watch?v=-IEn_5PTTdk', () => {
  const url = 'https://www.youtube.com/watch?v=-IEn_5PTTdk';
  const result = extractVideoId(url);
  assert.strictEqual(result, '-IEn_5PTTdk');
});

test('Test Case 2: https://youtu.be/-IEn_5PTTdk', () => {
  const url = 'https://youtu.be/-IEn_5PTTdk';
  const result = extractVideoId(url);
  assert.strictEqual(result, '-IEn_5PTTdk');
});

test('Test Case 3: https://www.youtube.com/shorts/-IEn_5PTTdk', () => {
  const url = 'https://www.youtube.com/shorts/-IEn_5PTTdk';
  const result = extractVideoId(url);
  assert.strictEqual(result, '-IEn_5PTTdk');
});

test('Test Case 4: https://youtu.be/-IEn_5PTTdk?si=HPQ_OmAu6tfzwWq9', () => {
  const url = 'https://youtu.be/-IEn_5PTTdk?si=HPQ_OmAu6tfzwWq9';
  const result = extractVideoId(url);
  assert.strictEqual(result, '-IEn_5PTTdk');
});

test('Test Case 5: https://www.youtube.com/watch?v=-IEn_5PTTdk&t=20s', () => {
  const url = 'https://www.youtube.com/watch?v=-IEn_5PTTdk&t=20s';
  const result = extractVideoId(url);
  assert.strictEqual(result, '-IEn_5PTTdk');
});

test('Test Case 6: https://google.com', () => {
  const url = 'https://google.com';
  const result = extractVideoId(url);
  assert.strictEqual(result, null);
});

test('Test Case 7: Empty string', () => {
  const url = '';
  const result = extractVideoId(url);
  assert.strictEqual(result, null);
});

// Additional Edge Case Tests
test('General: Standard youtube.com/watch URL without www or https', () => {
  assert.strictEqual(extractVideoId('http://youtube.com/watch?v=MFhxShGxHWc'), 'MFhxShGxHWc');
});

test('General: youtube.com/embed URL format', () => {
  assert.strictEqual(extractVideoId('https://www.youtube.com/embed/MFhxShGxHWc'), 'MFhxShGxHWc');
});

test('General: Invalid video ID length or invalid characters', () => {
  assert.strictEqual(extractVideoId('https://www.youtube.com/watch?v=short'), null);
  assert.strictEqual(extractVideoId('https://www.youtube.com/watch?v=too_long_video_id_123'), null);
});

test('General: Null and undefined input', () => {
  assert.strictEqual(extractVideoId(null), null);
  assert.strictEqual(extractVideoId(undefined), null);
});
