import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SectionLabel = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: #666666;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const TrackCard = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    overflow: hidden;
    background: #fafafa;
`;

const TrackHeader = styled.a`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    text-decoration: none;
    color: inherit;

    &:hover {
        background: #f0f0f0;
    }
`;

const AlbumImg = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
    background: #e0e0e0;
`;

const TrackInfo = styled.div`
    flex-grow: 1;
    min-width: 0;
`;

const TrackName = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #0d0d0d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArtistName = styled.div`
    font-size: 12px;
    color: #888888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const OpenIcon = styled.span`
    color: #1DB954;
    flex-shrink: 0;
    font-size: 15px;
`;

// 일기의 대표 감정에 맞춰 추천된 곡 목록을 플레이리스트처럼 보여줌.
// 각 트랙은 Spotify 임베드 미니 플레이어(재생 버튼으로 미리듣기 가능)를 포함하고,
// 상단 헤더를 클릭하면 Spotify 앱/웹으로 바로 이동함
const DiaryMusicList = ({ musics = [] }) => {
    if (!musics.length) return null;

    return (
        <Wrapper>
            <SectionLabel>
                <i className="fa-brands fa-spotify" style={{ color: '#1DB954' }}></i>
                오늘의 감정에 어울리는 노래
            </SectionLabel>

            {musics.map((track) => (
                <TrackCard key={track.musicNo}>
                    <TrackHeader href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        {track.albumImageUrl && <AlbumImg src={track.albumImageUrl} alt={track.trackName} />}
                        <TrackInfo>
                            <TrackName>{track.trackName}</TrackName>
                            <ArtistName>{track.artistName}</ArtistName>
                        </TrackInfo>
                        <OpenIcon title="Spotify에서 열기">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </OpenIcon>
                    </TrackHeader>

                    <iframe
                        title={`spotify-${track.trackId}`}
                        src={`https://open.spotify.com/embed/track/${track.trackId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </TrackCard>
            ))}
        </Wrapper>
    );
};

export default DiaryMusicList;
