---
layout: ../../layouts/PostLayout.astro
title: How to process audio into text?
date: 2017-11-04
category: python
tags: ['python', 'speach-to-text', 'gapi', 'google', 'speach', 'text']
---# Problem 😱

You want to process audio file into text.

---

# Solution 🤓

We will use gapi which offers ability to transform audio files into text.


```python
# GOOGLE_APPLICATION_CREDENTIALS=./gapi-auth.json
import json
import subprocess

from google.cloud import speech
from google.cloud.proto.speech.v1 import cloud_speech_pb2

speech_client = speech.SpeechClient()


path_to_file = './input.mp4'
output_path_to_file = './out.flac'


# command = 'ffmpeg -i {input_file} -ac 1 -c:a  flac answer_11.flac'
subprocess.call(['ffmpeg', '-i', '{input_file}'.format(input_file=path_to_file), '-ac', '1', '-c:a', 'flac', output_path_to_file])


def parse_speech_recognition_result(speech_recognition_result):
    data = {'data': []}
    for result in speech_recognition_result.results:
        for alternative in result.alternatives:
            data['data'].append({
                'transcript': alternative.transcript,
                'confidence': alternative.confidence,
            })
    return data


with open(output_path_to_file, 'rb') as recording_file:
    recording_bytes = recording_file.read()
    audio = cloud_speech_pb2.RecognitionAudio(content=recording_bytes)
    config = cloud_speech_pb2.RecognitionConfig(encoding="FLAC", sample_rate_hertz=44100, language_code="en-US")
    speech_recognition_result = speech_client.recognize(config=config, audio=audio)
    result = parse_speech_recognition_result(speech_recognition_result)

    dump_result = json.dumps(result)

    print(dump_result)
```
