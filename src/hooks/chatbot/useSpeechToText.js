import { useState, useRef, useCallback } from 'react';
import { sttApi } from '../../api/chatApi';

// 마이크로 녹음한 오디오를 서버(GCP Speech-to-Text)로 올려서 텍스트로 변환함.
// 텍스트 입력은 항상 그대로 두고, 마이크 버튼으로 텍스트를 채워주는 하이브리드 입력 방식.
// ★ 즐겨찾기 이후 추가/수정
export const useSpeechToText = ({ onResult, onStart, onEnd }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);

    // 녹음 중 실시간 파형(음파) GUI를 그리기 위한 분석 노드 — 값 자체는 상태로 두지 않고
    // ref로만 들고 있어서, 매 프레임 리렌더링 없이 캔버스에서 직접 읽어가게 함
    const analyserRef = useRef(null);
    const audioContextRef = useRef(null);

    const isSupported = typeof navigator !== 'undefined'
        && !!navigator.mediaDevices
        && typeof window !== 'undefined'
        && !!window.MediaRecorder;

    const startRecording = useCallback(async () => {
        if (!isSupported || isRecording) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            audioContextRef.current = audioContext;
            analyserRef.current = analyser;

            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                stream.getTracks().forEach(track => track.stop()); // 마이크 사용 중 표시 끄기
                audioContextRef.current?.close();
                audioContextRef.current = null;
                analyserRef.current = null;

                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });
                setIsTranscribing(true);
                try {
                    const text = await sttApi(audioBlob);
                    if (text) onResult?.(text);
                } catch (error) {
                    console.error("음성 인식 처리 실패:", error);
                } finally {
                    setIsTranscribing(false);
                    onEnd?.();
                }
            };

            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();
            setIsRecording(true);
            onStart?.(); // 녹음 시작 시점 — 재생 중이던 챗봇 음성을 즉시 멈추는 용도(바지-인)로 사용
        } catch (error) {
            console.error("마이크 접근 실패:", error);
        }
    }, [isSupported, isRecording, onResult, onStart, onEnd]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    }, []);

    const toggleRecording = useCallback(() => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }, [isRecording, startRecording, stopRecording]);

    return { isSupported, isRecording, isTranscribing, toggleRecording, analyserRef };
};
