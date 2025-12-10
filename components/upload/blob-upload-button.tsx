"use client"

import { useState } from "react"

import { RiImageAddLine, RiLoader4Line } from "@remixicon/react"

import { Button } from "@/components/ui/button"

interface BlobUploadButtonProps {
  uploadType: "logo" | "product"
  onUploadComplete: (url: string) => void
  onUploadError: (error: string) => void
  disabled?: boolean
  className?: string
}

export function BlobUploadButton({
  uploadType,
  onUploadComplete,
  onUploadError,
  disabled = false,
  className = "",
}: BlobUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 클라이언트 검증
    const maxSize = 1 * 1024 * 1024
    if (file.size > maxSize) {
      onUploadError(`파일 크기가 1MB를 초과합니다. 현재: ${(file.size / 1024 / 1024).toFixed(2)}MB`)
      return
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      onUploadError("잘못된 파일 형식입니다. JPEG, PNG, WebP, GIF만 허용됩니다.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", uploadType)

      // 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch("/api/blob-upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "업로드 실패")
      }

      const data = await response.json()

      if (data.success && data.url) {
        onUploadComplete(data.url)
      } else {
        throw new Error("URL이 반환되지 않았습니다")
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "업로드 실패"
      onUploadError(errorMessage)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      e.target.value = ""
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        id={`blob-upload-${uploadType}`}
        className="hidden"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
      />
      <label htmlFor={`blob-upload-${uploadType}`}>
        <Button
          type="button"
          variant="outline"
          disabled={disabled || isUploading}
          className={className}
          asChild
        >
          <span className="cursor-pointer">
            {isUploading ? (
              <>
                <RiLoader4Line className="mr-2 h-4 w-4 animate-spin" />
                업로드 중... {uploadProgress}%
              </>
            ) : (
              <>
                <RiImageAddLine className="mr-2 h-4 w-4" />
                {uploadType === "logo" ? "로고 업로드" : "제품 이미지 추가"}
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  )
}
