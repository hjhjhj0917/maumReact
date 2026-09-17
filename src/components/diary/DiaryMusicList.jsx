import React, { useState } from 'react';
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

const TrackHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
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

const IconButton = styled.button`
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background: transparent;
    color: #666666;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;

    &:hover {
        background: #e8e8e8;
    }
`;

const PlayButton = styled(IconButton)`
    color: #1DB954;
`;

const OpenLink = styled.a`
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #888888;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;

    &:hover {
        background: #e8e8e8;
    }
`;

// 일기의 대표 감정에 맞춰 추천된 곡 목록을 플레이리스트처럼 보여줌.
// Spotify 임베드는 iframe 하나하나가 자체 JS 플레이어를 띄우는 무거운 위젯이라,
// 처음부터 전부 마운트하면 곡 수만큼(최대 5개) 동시에 로드되며 렌더링이 버벅이는 원인이 됨.
// 그래서 트랙 정보만 가볍게 먼저 보여주고, 재생 버튼을 눌렀을 때만 해당 곡의 iframe을 마운트함
const DiaryMusicList = ({ musics = [] }) => {
    const [expandedIds, setExpandedIds] = useState(() => new Set());

    if (!musics.length) return null;

    const toggleExpand = (musicNo) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(musicNo)) {
                next.delete(musicNo);
            } else {
                next.add(musicNo);
            }
            return next;
        });
    };

    return (
        <Wrapper>
            <SectionLabel>
                <i className="fa-brands fa-spotify" style={{ color: '#1DB954' }}></i>
                오늘의 감정에 어울리는 노래
            </SectionLabel>

            {musics.map((track) => {
                const isExpanded = expandedIds.has(track.musicNo);

                return (
                    <TrackCard key={track.musicNo}>
                        <TrackHeader>
                            {track.albumImageUrl && <AlbumImg src={track.albumImageUrl} alt={track.trackName} loading="lazy" />}
                            <TrackInfo>
                                <TrackName>{track.trackName}</TrackName>
                                <ArtistName>{track.artistName}</ArtistName>
                            </TrackInfo>
                            <PlayButton
                                type="button"
                                onClick={() => toggleExpand(track.musicNo)}
                                title={isExpanded ? '플레이어 닫기' : '미리듣기'}
                            >
                                <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-play'}`}></i>
                            </PlayButton>
                            <OpenLink href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" title="Spotify에서 열기">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </OpenLink>
                        </TrackHeader>

                        {isExpanded && (
                            <iframe
                                title={`spotify-${track.trackId}`}
                                src={`https://open.spotify.com/embed/track/${track.trackId}?utm_source=generator&theme=0`}
                                width="100%"
                                height="80"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            />
                        )}
                    </TrackCard>
                );
            })}
        </Wrapper>
    );
};

export default DiaryMusicList;
