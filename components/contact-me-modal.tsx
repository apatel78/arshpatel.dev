'use client' 

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Send } from "lucide-react"
import { sendEmail } from "@/components/actions/sendEmail"

const RATE_LIMIT_WINDOW_MS = 60 * 1000; 
const RATE_LIMIT_MAX_REQUESTS = 3;  

interface ContactMeModalProps {
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactMeModal({ onClose }: ContactMeModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const submissionTimestamps = useRef<number[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      submissionTimestamps.current = submissionTimestamps.current.filter(
        (timestamp) => timestamp > now - RATE_LIMIT_WINDOW_MS
      );
    }, RATE_LIMIT_WINDOW_MS); 

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    const now = Date.now();
    submissionTimestamps.current = submissionTimestamps.current.filter(
      (timestamp) => timestamp > now - RATE_LIMIT_WINDOW_MS
    );

    if (submissionTimestamps.current.length >= RATE_LIMIT_MAX_REQUESTS) {
        setSubmitStatus('error');
        setErrorMessage("Too many attempts. Please wait a minute and try again.");
        setIsSubmitting(false);
        return; 
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage(null)

    submissionTimestamps.current.push(now);

    const result = await sendEmail(formData)

    setIsSubmitting(false)

    if (result.success) {
      setSubmitStatus('success')
    } else {
      setSubmitStatus('error')
      setErrorMessage(result.error || "An unknown error occurred.")
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
      onClick={handleOverlayClick}
    >
      <div className="bg-card text-card-foreground rounded-xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-foreground">Contact Me</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted disabled:opacity-50"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary dark:bg-[#00E2C3] mb-4">
                <Send className="h-8 w-8 text-primary-foreground dark:text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Message Sent!</h3>
              <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1 text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground disabled:opacity-50"
                ></textarea>
              </div>

              {submitStatus === 'error' && (
                 <p className="text-sm text-red-500">Error: {errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
