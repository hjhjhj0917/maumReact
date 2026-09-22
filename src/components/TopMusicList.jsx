import React from 'react';
import * as S from '../style/components/MyPageWidgets.styles';

// ★ 즐겨찾기 이후 추가/수정
const TopMusicList = ({ tracks }) => {
    return (
        <S.WidgetCard>
            <S.WidgetTitle>많이 추천받은 음악</S.WidgetTitle>
            {(!tracks || tracks.length === 0) ? (
                <S.EmptyState>아직 추천받은 음악이 없습니다.</S.EmptyState>
            ) : (
                <S.MusicList>
                    {tracks.map((track, index) => (
                        <S.MusicItem
                            key={`${track.trackName}-${track.artistName}`}
                            href={track.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <S.MusicRank>{index + 1}</S.MusicRank>
                            <S.MusicThumb src={track.albumImageUrl} alt={track.trackName} />
                            <S.MusicInfo>
                                <div>{track.trackName}</div>
                                <div>{track.artistName}</div>
                            </S.MusicInfo>
                            <S.MusicCount>{track.recommendCount}회</S.MusicCount>
                        </S.MusicItem>
                    ))}
                </S.MusicList>
            )}
        </S.WidgetCard>
    );
};

export default TopMusicList;
