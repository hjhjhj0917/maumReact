import React, { useState, useEffect } from 'react';
import {
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    Radar, Tooltip, ResponsiveContainer
} from 'recharts';
import { getEmotionStats } from '../api/diaryApi';
import * as S from '../style/components/EmotionGraph.styles';

// 축이 너무 많으면 레이더가 읽기 어려워져서 상위 감정만 표시함
const MAX_AXES = 10;

const RadarDot = (props) => {
    const { cx, cy, payload } = props;
    return <circle cx={cx} cy={cy} r={4} fill={payload.color} stroke="#ffffff" strokeWidth={1.5} />;
};

const RadarTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const { subject, count } = payload[0].payload;

    return (
        <S.TooltipBox>
            <strong>{subject}</strong> {count}회
        </S.TooltipBox>
    );
};

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

    const chartData = stats.slice(0, MAX_AXES).map(stat => ({
        subject: stat.emotion,
        count: stat.count,
        color: stat.color
    }));

    return (
        <S.GraphContainer>
            {chartData.length === 0 ? (
                <S.EmptyState>
                    아직 충분히 분석된 감정 데이터가 없습니다.
                </S.EmptyState>
            ) : (
                <S.ChartWrapper>
                    <ResponsiveContainer width="100%" height={360}>
                        <RadarChart data={chartData} outerRadius="70%">
                            <PolarGrid stroke="#ededeb" />
                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: '#37352f' }} />
                            <PolarRadiusAxis angle={90} allowDecimals={false} tick={{ fontSize: 10, fill: '#9b9a97' }} />
                            <Radar
                                dataKey="count"
                                stroke="#8fa8db"
                                fill="#8fa8db"
                                fillOpacity={0.35}
                                dot={<RadarDot />}
                            />
                            <Tooltip content={<RadarTooltip />} />
                        </RadarChart>
                    </ResponsiveContainer>
                </S.ChartWrapper>
            )}
        </S.GraphContainer>
    );
};

export default EmotionGraph;
