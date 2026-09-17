import React from 'react';
import * as S from '../style/components/MyPageWidgets.styles';

const CHART_WIDTH = 480;
const CHART_HEIGHT = 140;
const PADDING_X = 30;
const PADDING_Y = 20;

const DepressionTrendChart = ({ trend }) => {
    if (!trend || trend.length === 0) {
        return (
            <S.WidgetCard>
                <S.WidgetTitle>월별 우울 지수 추이</S.WidgetTitle>
                <S.EmptyState>아직 분석된 감정 데이터가 없습니다.</S.EmptyState>
            </S.WidgetCard>
        );
    }

    const scores = trend.map(t => Number(t.avgDepScore) || 0);
    const maxScore = Math.max(...scores, 1);
    const minScore = Math.min(...scores, 0);
    const range = maxScore - minScore || 1;

    const usableWidth = CHART_WIDTH - PADDING_X * 2;
    const usableHeight = CHART_HEIGHT - PADDING_Y * 2;
    const step = trend.length > 1 ? usableWidth / (trend.length - 1) : 0;

    const points = scores.map((score, i) => {
        const x = PADDING_X + step * i;
        const y = PADDING_Y + usableHeight - ((score - minScore) / range) * usableHeight;
        return { x, y };
    });

    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
        <S.WidgetCard>
            <S.WidgetTitle>월별 우울 지수 추이</S.WidgetTitle>
            <S.TrendChartWrapper>
                <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} preserveAspectRatio="xMidYMid meet">
                    <polyline
                        points={polylinePoints}
                        fill="none"
                        stroke="#8EA4D2"
                        strokeWidth="2"
                    />
                    {points.map((p, i) => (
                        <circle key={trend[i].month} cx={p.x} cy={p.y} r="3" fill="#8EA4D2" />
                    ))}
                    {trend.map((t, i) => (
                        <text
                            key={t.month}
                            x={points[i].x}
                            y={CHART_HEIGHT - 4}
                            fontSize="10"
                            fill="#9b9a97"
                            textAnchor="middle"
                        >
                            {t.month?.slice(5)}월
                        </text>
                    ))}
                </svg>
            </S.TrendChartWrapper>
        </S.WidgetCard>
    );
};

export default DepressionTrendChart;
