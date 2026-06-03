import React, { useState, useEffect } from 'react';
import { getEmotionStats } from '../api/diaryApi';
import * as S from '../style/components/EmotionGraph.styles';

const EmotionGraph = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getEmotionStats();
                if (response) {
                    setStats(response);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchStats();
    }, []);

    const maxCount = stats.length > 0 ? stats[0].count : 1;

    return (
        <S.GraphContainer>
            <S.Header>
                <h3>
                    나의 감정 통계
                </h3>
            </S.Header>

            {stats.length === 0 ? (
                <S.EmptyState>
                    아직 충분히 분석된 감정 데이터가 없습니다.
                </S.EmptyState>
            ) : (
                <S.GraphBody>
                    {stats.map((stat, index) => {
                        const percent = (stat.count / maxCount) * 100;
                        const isInside = percent > 15;

                        return (
                            <S.Row key={index}>
                                <S.LabelArea>{stat.emotion}</S.LabelArea>
                                <S.TrackArea>
                                    <S.Bar $percent={percent} $color={stat.color} $isInside={isInside}>
                                        {isInside && <S.CountText $isInside={true}>{stat.count}회</S.CountText>}
                                    </S.Bar>
                                    {!isInside && <S.CountText $isInside={false}>{stat.count}회</S.CountText>}
                                </S.TrackArea>
                            </S.Row>
                        );
                    })}
                </S.GraphBody>
            )}
        </S.GraphContainer>
    );
};

export default EmotionGraph;