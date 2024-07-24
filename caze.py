import os
from googleapiclient.discovery import build

# Defina sua chave de API
api_key = 'AIzaSyDQGhmiS270ifXFpUa8c7zA75TtqPJk5Xg'

# Crie o serviço de conexão com a API do YouTube
youtube = build('youtube', 'v3', developerKey=api_key)

# Defina o ID do canal ou nome de usuário
channel_id = 'UCZiYbVptd3PVPf4f6eR6UaQ'

# Faça a solicitação para obter uploads do canal
request = youtube.search().list(
    part='id,snippet',
    channelId=channel_id,
    type='video',
    eventType='live',
    maxResults=50
)

response = request.execute()

# Extraia os detalhes dos vídeos da resposta
videos = [{
    'video_id': item['id']['videoId'],
    'title': item['snippet']['title'],
    'thumbnail_url': item['snippet']['thumbnails']['high']['url']
} for item in response['items']]
live_count = len(response['items'])

print(f'Quantidade de lives: {live_count}')
for video in videos:
    #print(f"Título: {video['title']}, ID: {video['video_id']}, Imagem: {video['thumbnail_url']}")
    img = str(video['thumbnail_url'])
    titulo =str(video['title'])
    ids = str(video['video_id'])
    print('#EXTINF:-1 tvg-id="" tvg-logo="'+img+'",'+titulo+'')
    print('plugin://plugin.video.youtube/play/?video_id='+ids+'')
