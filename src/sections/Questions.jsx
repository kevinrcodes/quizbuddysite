import { useState } from 'react'
import { Container } from 'react-bootstrap'
import styles from './Questions.module.css'

function Questions() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Is it really free?",
      answer: "You can try out the full capability of the app with the free version. However you will have a limited number of queries available."
    },
    {
      question: "What subjects does it support?",
      answer: "Quiz Buddy is powered by the most advanced AI models, so it supports the majority of subjects you'll see. Anything that's not extremely obscure."
    },
    {
      question: "What languages does it support?",
      answer: "Quiz Buddy understands over 50 major languages, including English, Spanish, French, Portuguese, Russian, Japanese, Chinese, and Arabic."
    },
    {
      question: "How accurate are the answers?",
      answer: "Quiz Buddy is designed to be careful and handle tricky questions with confidence. No system is perfect, but the accuracy is backed by 4.0 GPAs and always improving!"
    },
    {
      question: "Do I get an account?",
      answer: "Yes! Once you've downloaded the app, you can create your account and access your subscription from any device."
    },
    {
      question: "What if something isn't working?",
      answer: "If you find a problem which cannot be fixed by restarting the app, please contact us through the website. We usually respond to all inquiries within 48 hours."
    }
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className={styles.questions}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>Everything you need to know about our app</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${openIndex === index ? styles.active : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              <div className={styles.question}>
                <h3>{faq.question}</h3>
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Questions
