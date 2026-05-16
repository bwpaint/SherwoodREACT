'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from './cn'

/**
 * Scroll-triggered fade-in wrapper (handoff §7.5).
 * Respects prefers-reduced-motion.
 *
 * Usage:
 *   <RevealSection delay={160}>...</RevealSection>
 */
export function RevealSection({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: React.ReactNode
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li'
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setReduced(true)
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        transitionDelay: reduced ? undefined : `${delay}ms`,
        transitionDuration: reduced ? undefined : '650ms',
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        transitionProperty: 'opacity, transform',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
      }}
      className={className}
    >
      {children}
    </Tag>
  )
}
