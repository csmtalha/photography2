'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import { siteConfig } from '@/config/site'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate form submission
    setTimeout(() => {
      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => setStatus('idle'), 3000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-hero mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Let's discuss your next project, collaboration, or creative vision.
            </motion.p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-3xl mb-6">Direct Contact</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Email
                    </div>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">
                      Phone
                    </div>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl mb-4">Follow</h3>
                <div className="space-y-3">
                  {Object.entries(siteConfig.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-400 hover:text-white transition-colors capitalize"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-gray-400 leading-relaxed">
                  Available for commissions, collaborations, and creative projects worldwide. 
                  Typically respond within 24-48 hours.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.4}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm uppercase tracking-widest font-medium"
              >
                {status === 'sending' && 'Sending...'}
                {status === 'sent' && 'Message Sent!'}
                {status === 'idle' && 'Send Message'}
                {status === 'error' && 'Try Again'}
              </button>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  Thank you! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
