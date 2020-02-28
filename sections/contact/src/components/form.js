import React, { useState } from 'react'
import styles from './form.module.css'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    body: ''
  })

  const [status, setStatus] = useState('IDLE')

  const onSubmit = e => {
    e.preventDefault()
    updateStatus()
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] })
  }

  const updateStatus = () => {
    setStatus('SUCCESS')
  }

  if (status === 'SUCCESS') {
    return <p className={styles.success}>Message sent!</p>
  }

  const { name, email, subject, body } = formData

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          name="name"
          className={styles.input}
          value={name}
          onChange={onChange}
        />
      </label>
      <label className={styles.label}>
        Email
        <input
          type="email"
          name="email"
          className={styles.input}
          value={email}
          onChange={onChange}
        />
      </label>
      <label className={styles.label}>
        Subject
        <input
          type="text"
          name="subject"
          className={styles.input}
          value={subject}
          onChange={onChange}
        />
      </label>
      <label className={styles.label}>
        Body
        <textarea
          name="body"
          className={styles.input}
          value={body}
          onChange={onChange}
        />
      </label>
      <button className={styles.button}>Send</button>
    </form>
  )
}

export default Form
