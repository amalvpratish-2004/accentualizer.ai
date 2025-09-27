"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mic, Square, Play, Pause, RotateCcw, Loader2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type RecordingState = "idle" | "recording" | "recorded" | "analyzing" | "results"

export function VoiceRecorder() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle")
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const sampleText =
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for accent analysis."

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        setRecordingState("recorded")
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setRecordingState("recording")
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.stop()

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audio = new Audio(URL.createObjectURL(audioBlob))
      audioRef.current = audio
      audio.play()
      setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const analyzeRecording = () => {
    setRecordingState("analyzing")
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setRecordingState("results")
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const resetRecording = () => {
    setRecordingState("idle")
    setRecordingTime(0)
    setIsPlaying(false)
    setAnalysisProgress(0)
    setAudioBlob(null)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try It Now</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Read the sample text below and record your voice to get instant accent analysis
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-8">
            <h3 className="text-xl font-semibold mb-4">Sample Text</h3>
            <p className="text-lg leading-relaxed text-muted-foreground bg-accent/50 p-6 rounded-lg">{sampleText}</p>
          </Card>

          <Card className="p-8">
            <div className="text-center">
              {/* Recording Button */}
              <div className="relative mb-8">
                {recordingState === "recording" ? (
                  // Recording state - show waveform-like interface
                  <div className="bg-gradient-to-r from-red-500/20 via-red-400/30 to-red-500/20 rounded-full p-8 mx-auto max-w-md">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-red-500 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-2xl font-mono text-red-500 font-bold">{formatTime(recordingTime)}</div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-red-500 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${(i + 5) * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <Button
                      size="lg"
                      variant="destructive"
                      onClick={stopRecording}
                      className="rounded-full w-16 h-16 p-0"
                    >
                      <Square className="w-6 h-6" fill="currentColor" />
                    </Button>
                    <div className="text-sm text-red-600 mt-2 font-medium">Recording... Click to stop</div>
                  </div>
                ) : (
                  // Idle state - show microphone button
                  <div
                    className={cn(
                      "w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                      "bg-gradient-to-br from-primary/20 to-primary/30 border-2 border-primary/50 hover:border-primary hover:from-primary/30 hover:to-primary/40",
                    )}
                    onClick={startRecording}
                  >
                    <Button
                      size="lg"
                      variant="ghost"
                      className="w-20 h-20 rounded-full p-0 text-primary hover:text-primary hover:bg-transparent"
                      disabled={recordingState === "analyzing"}
                    >
                      <Mic className="w-8 h-8" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {recordingState === "recorded" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={playRecording}
                      className="flex items-center gap-2 bg-transparent"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? "Pause" : "Play Recording"}
                    </Button>
                    <Button onClick={analyzeRecording} className="flex items-center gap-2">
                      Analyze Accent
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {(recordingState === "recorded" || recordingState === "results") && (
                  <Button variant="outline" onClick={resetRecording} className="flex items-center gap-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                )}
              </div>

              {/* Analysis Progress */}
              {recordingState === "analyzing" && (
                <div className="max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-lg">Analyzing your accent...</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                  <div className="text-sm text-muted-foreground mt-2">{Math.round(analysisProgress)}% complete</div>
                </div>
              )}

              {/* Results */}
              {recordingState === "results" && (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Analysis Complete!</h3>
                    <p className="text-muted-foreground">Here's your personalized accent feedback</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h4 className="font-semibold mb-3">Accent Profile</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Primary Accent:</span>
                          <span className="font-medium">General American</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Clarity Score:</span>
                          <span className="font-medium text-primary">8.5/10</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h4 className="font-semibold mb-3">Key Insights</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Strong vowel pronunciation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>Clear consonant articulation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500">•</span>
                          <span>Work on 'th' sound pronunciation</span>
                        </li>
                      </ul>
                    </Card>
                  </div>
                </div>
              )}

              {/* Instructions */}
              {recordingState === "idle" && (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Click the microphone to start recording</p>
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>High-quality audio analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Instant feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Privacy protected</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
