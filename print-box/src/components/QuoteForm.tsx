'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'

type QuoteFormProps = {
  title?: string
  description?: string
}

type Material = 'PLA' | 'ABS' | 'PETG' | 'Resina' | 'TPU' | 'Nylon' | 'A definir'

const MATERIALS: Material[] = ['PLA', 'ABS', 'PETG', 'Resina', 'TPU', 'Nylon', 'A definir']

type FormState = {
  customerName: string
  email: string
  phone: string
  description: string
  material: Material
  quantity: number
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--fg-base)] placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent)] focus:outline-none transition-colors'

const labelClass = 'mb-2 block text-xs uppercase tracking-widest text-[var(--fg-muted)]'

export default function QuoteForm({ title, description }: QuoteFormProps) {
  const [form, setForm] = useState<FormState>({
    customerName: '',
    email: '',
    phone: '',
    description: '',
    material: 'PLA',
    quantity: 1,
  })
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }))
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      let referenceFileId: string | number | null = null

      if (file) {
        const mediaData = new FormData()
        mediaData.append('file', file)
        mediaData.append('_payload', JSON.stringify({ alt: file.name }))

        const mediaRes = await fetch('/api/media', {
          method: 'POST',
          body: mediaData,
        })

        if (!mediaRes.ok) {
          throw new Error('No se pudo subir el archivo de referencia.')
        }

        const mediaJson = (await mediaRes.json()) as {
          doc?: { id: string | number }
          id?: string | number
        }
        referenceFileId = mediaJson.doc?.id ?? mediaJson.id ?? null
      }

      const quoteRes = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          referenceFile: referenceFileId,
        }),
      })

      if (!quoteRes.ok) {
        throw new Error('No se pudo enviar la cotización.')
      }

      setStatus('success')
      setForm({
        customerName: '',
        email: '',
        phone: '',
        description: '',
        material: 'A definir',
        quantity: 1,
      })
      setFile(null)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Error desconocido')
    }
  }

  return (
    <div className="border border-[var(--border-base)] bg-[var(--bg-elevated)] p-8 md:p-12">
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg-base)] md:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-sm text-[var(--fg-muted)]">{description}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="customerName" className={labelClass}>
            Nombre
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            required
            value={form.customerName}
            onChange={handleChange}
            className={inputClass}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="nombre@correo.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            placeholder="+591 ..."
          />
        </div>

        <div>
          <label htmlFor="material" className={labelClass}>
            Material
          </label>
          <select
            id="material"
            name="material"
            value={form.material}
            onChange={handleChange}
            className={inputClass}
          >
            {MATERIALS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className={labelClass}>
            Cantidad
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            required
            value={form.quantity}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="referenceFile" className={labelClass}>
            Archivo de referencia
          </label>
          <input
            id="referenceFile"
            name="referenceFile"
            type="file"
            onChange={handleFile}
            className="block w-full text-sm text-[var(--fg-muted)] file:mr-4 file:border file:border-[var(--border-base)] file:bg-transparent file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-widest file:text-[var(--accent)] hover:file:border-[var(--accent)]"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className={labelClass}>
            Descripción del proyecto
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={form.description}
            onChange={handleChange}
            rows={5}
            className={inputClass}
            placeholder="Contanos qué necesitás imprimir o modelar..."
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 border border-[var(--accent)] px-6 py-3 text-sm font-medium uppercase tracking-widest text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {status === 'submitting' ? 'Enviando...' : 'Solicitar cotización'}
          </button>

          {status === 'success' && (
            <p className="border border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] px-4 py-3 text-sm text-[var(--accent)]">
              Cotización enviada. Te contactaremos pronto.
            </p>
          )}
          {status === 'error' && (
            <p className="border border-red-500 bg-red-500/5 px-4 py-3 text-sm text-red-500 dark:text-red-400">
              {errorMsg || 'Ocurrió un error. Intentá nuevamente.'}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
