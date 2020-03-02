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
    updateStatus('PENDING')

    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        updateStatus('SUCCESS')
      })
      .catch(err => {
        console.log(err)
        updateStatus('ERROR')
      })
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] })
  }

  const updateStatus = status => {
    setStatus(status)
  }

  const resetStatus = () => {
    setFormData({
      formData: {
        name: '',
        email: '',
        subject: '',
        body: ''
      }
    })
    setStatus('IDLE')
  }

  if (status === 'SUCCESS') {
    return (
      <p className={styles.success}>
        Message sent!
        <button
          className={`${styles.button} ${styles.centered}`}
          onClick={resetStatus}
        >
          Reset
        </button>
      </p>
    )
  }

  const { name, email, subject, body } = formData

  return (
    <>
      {status === 'ERROR' && <p className={styles.error}>There were errors!</p>}
      <form
        className={`${styles.form} ${status === 'PENDING' && styles.pending}`}
        onSubmit={onSubmit}
      >
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
    </>
  )
}

export default Form
