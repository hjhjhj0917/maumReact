import React, { useEffect, useRef } from 'react';

// 마이크 입력 파형을 심장 박동처럼(------^---^------) 실시간으로 그려주는 캔버스.
// analyserRef가 살아있는 동안(녹음 중)에만 requestAnimationFrame으로 계속 갱신함.
// ★ 즐겨찾기 이후 추가/수정
const VoiceWave = ({ analyserRef, active, width = 160, height = 40 }) => {
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!active) return undefined;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dataArray = new Uint8Array(128);

        const draw = () => {
            const analyser = analyserRef.current;
            ctx.clearRect(0, 0, width, height);

            if (analyser) {
                analyser.getByteTimeDomainData(dataArray);

                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#FF3B30';

                const sliceWidth = width / dataArray.length;
                let x = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    const v = (dataArray[i] - 128) / 128; // -1 ~ 1
                    const y = height / 2 + v * (height / 2 - 2);
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                    x += sliceWidth;
                }
                ctx.stroke();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, analyserRef, width, height]);

    if (!active) return null;

    return <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }} />;
};

export default VoiceWave;
