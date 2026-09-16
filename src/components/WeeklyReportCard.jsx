import React from 'react';
import * as S from '../style/components/MyPageWidgets.styles';

const WeeklyReportCard = ({ report, isLoading }) => {
    return (
        <S.ReportCard>
            <S.ReportHeader>
                <S.WidgetTitle>이번 주 리포트</S.WidgetTitle>
                {report && (
                    <S.ReportPeriod>{report.periodStart} ~ {report.periodEnd}</S.ReportPeriod>
                )}
            </S.ReportHeader>

            {isLoading ? (
                <S.EmptyState>이번 주 일기를 살펴보는 중이에요...</S.EmptyState>
            ) : (
                <>
                    <S.ReportComment>{report?.comment}</S.ReportComment>
                    <S.ReportMetaRow>
                        <span>이번 주 작성 {report?.diaryCount ?? 0}회</span>
                        {report?.avgDepScore != null && (
                            <span>평균 우울 지수 {report.avgDepScore}</span>
                        )}
                    </S.ReportMetaRow>
                </>
            )}
        </S.ReportCard>
    );
};

export default WeeklyReportCard;
