Para salvar os resultados em um arquivo ao invés de apenas imprimir no console, você pode usar o seguinte código:

```python
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

# Abra um arquivo para escrita
with open('lives.m3u', 'w', encoding='utf-8') as f:
    f.write(f'#EXTM3U\n')
    f.write(f'# Quantidade de lives: {live_count}\n')
    for video in videos:
        img = str(video['thumbnail_url'])
        titulo = str(video['title'])
        ids = str(video['video_id'])
        f.write(f'#EXTINF:-1 tvg-id="" tvg-logo="{img}",{titulo}\n')
        f.write(f'plugin://plugin.video.youtube/play/?video_id={ids}\n')

print('Arquivo lives.m3u salvo com sucesso!')
```

Este código salvará as informações dos vídeos em um arquivo chamado `lives.m3u` no mesmo diretório onde o script está sendo executado.
