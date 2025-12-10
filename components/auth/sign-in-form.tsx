"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { RiGithubFill, RiGoogleFill } from "@remixicon/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { oneTap, signIn } from "@/lib/auth-client"
import { SignInFormData, signInSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { TurnstileCaptcha } from "./turnstile-captcha"

export function SignInForm() {
  const router = useRouter()
  const [loadingButtons, setLoadingButtons] = useState({
    google: false,
    email: false,
    github: false,
  })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const [generalError, setGeneralError] = useState<string | null>(null)

  const handleLogin = async (provider: string) => {
    setLoadingButtons((prevState) => ({ ...prevState, [provider]: true }))
    try {
      await signIn.social({
        provider: provider as "google" | "github",
        callbackURL: "/",
      })
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoadingButtons((prevState) => ({ ...prevState, [provider]: false }))
    }
  }

  // ============================================
  // 🚧 DEV ONLY - Remove before production! 🚧
  // ============================================
  // 개발용 빠른 로그인
  // 프로덕션 배포 시 아래 함수와 버튼(LINE 133-161)을 삭제하세요
  const handleDevLogin = async (email: string) => {
    try {
      setLoadingButtons((prevState) => ({ ...prevState, email: true }))
      toast.info("Dev login in progress...")

      const response = await fetch("/api/dev-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to login")
      }

      toast.success("Dev login successful!")
      window.location.href = data.redirectTo || "/"
    } catch (error) {
      console.error("Dev login error:", error)
      toast.error(error instanceof Error ? error.message : "Dev login failed")
    } finally {
      setLoadingButtons((prevState) => ({ ...prevState, email: false }))
    }
  }

  const handleLoginEmail = async (data: SignInFormData) => {
    if (!turnstileToken) {
      setGeneralError("Please complete the security verification")
      return
    }

    const options = {
      email: data.email,
      password: data.password,
      callbackURL: "/",
      fetchOptions: {
        headers: {
          "x-captcha-response": turnstileToken,
        },
      },
    }

    try {
      setLoadingButtons((prevState) => ({ ...prevState, email: true }))
      setGeneralError(null)

      const result = await signIn.email(options)
      if (result?.error?.message) {
        setGeneralError(result.error.message)
        return
      }
      router.push("/")
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoadingButtons((prevState) => ({ ...prevState, email: false }))
    }
  }

  useEffect(() => {
    oneTap({
      fetchOptions: {
        onError: ({ error }) => {
          toast.error(error.message || "An error occurred")
        },
        onSuccess: () => {
          toast.success("Successfully signed in")
          window.location.href = "/"
        },
      },
    })
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 sm:px-0">
      <Card className="w-full rounded-md shadow-none">
        <CardHeader className="flex flex-col items-center gap-2 px-4 sm:px-6">
          <CardTitle className="text-center text-xl sm:text-2xl">
            다시 오신 것을 환영합니다
          </CardTitle>
          <CardDescription className="text-center">계정에 로그인하여 계속하세요</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-6 sm:px-6">
          <form onSubmit={handleSubmit(handleLoginEmail)} className="flex flex-col gap-4">
            {/* 개발 환경에서만 표시되는 빠른 로그인 버튼 */}
            {process.env.NODE_ENV === "development" && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-center text-xs">Dev Mode - Quick Login</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    className="w-full cursor-pointer text-xs"
                    variant="secondary"
                    type="button"
                    onClick={() => handleDevLogin("dev@test.com")}
                    disabled={loadingButtons.email}
                  >
                    Admin
                  </Button>
                  <Button
                    className="w-full cursor-pointer text-xs"
                    variant="secondary"
                    type="button"
                    onClick={() => handleDevLogin("designer@test.com")}
                    disabled={loadingButtons.email}
                  >
                    Designer
                  </Button>
                </div>
                <div className="border-border relative text-center text-xs after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or use social login
                  </span>
                </div>
              </div>
            )}

            <Button
              className="w-full cursor-pointer"
              variant="outline"
              type="button"
              onClick={() => handleLogin("google")}
              disabled={loadingButtons.google}
            >
              <RiGoogleFill className="me-1" size={16} aria-hidden="true" />
              {loadingButtons.google ? "로딩 중..." : "구글로 로그인"}
            </Button>
            <Button
              className="w-full cursor-pointer"
              variant="outline"
              type="button"
              onClick={() => handleLogin("github")}
              disabled={loadingButtons.github}
            >
              <RiGithubFill className="me-1" size={16} aria-hidden="true" />
              {loadingButtons.github ? "로딩 중..." : "Github로 로그인"}
            </Button>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">또는</span>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  className="w-full"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <Label htmlFor="password">비밀번호</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs underline-offset-4 hover:underline"
                  >
                    비밀번호를 잊으셨나요?
                  </Link>
                </div>
                <Input id="password" type="password" {...register("password")} className="w-full" />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <TurnstileCaptcha onVerify={(token) => setTurnstileToken(token)} />

              {generalError && <p className="text-center text-sm text-red-500">{generalError}</p>}
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loadingButtons.email || !turnstileToken}
              >
                {loadingButtons.email ? "로그인 중..." : "로그인"}
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
              계정이 없으신가요?{" "}
              <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
                회원가입
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary px-4 text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        계속 진행하면 <Link href="/legal/terms">서비스 약관</Link> 및{" "}
        <Link href="/legal/privacy">개인정보 처리방침</Link>에 동의하는 것으로 간주됩니다.
      </div>
    </div>
  )
}
