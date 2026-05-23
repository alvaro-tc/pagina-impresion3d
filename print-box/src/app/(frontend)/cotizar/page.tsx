import Container from '@/components/Container'
import SectionHeader from '@/components/SectionHeader'
import QuoteForm from '@/components/QuoteForm'

export const metadata = {
  title: 'Cotizar impresión 3D — PRINT BOX',
  description: 'Solicitá tu cotización: subí tu archivo .STL/.OBJ o contanos tu idea.',
}

export default function CotizarPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="Cotizá tu proyecto"
          title="Pedinos una cotización"
          description="Subí tu archivo .STL u .OBJ, o describí tu idea — te respondemos con materiales, tiempos y precio."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr]">
          <aside className="space-y-8 text-sm text-neutral-400">
            <Step n={1} title="Contanos tu idea">
              Descripción breve de la pieza, uso final y dimensiones aproximadas.
            </Step>
            <Step n={2} title="Subí un archivo (opcional)">
              Si ya tenés el modelo, adjuntá tu .STL/.OBJ. Si no, podemos modelarlo por vos.
            </Step>
            <Step n={3} title="Recibí tu presupuesto">
              Te respondemos con material recomendado, tiempo y costo final.
            </Step>
          </aside>

          <QuoteForm
            title="Datos del proyecto"
            description="Completá el formulario y nos pondremos en contacto en menos de 48hs."
          />
        </div>
      </Container>
    </section>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-neutral-800 pl-5">
      <div className="text-xs uppercase tracking-[0.2em] text-lime-400">Paso {n}</div>
      <div className="mt-1 text-base font-medium text-neutral-100">{title}</div>
      <p className="mt-2 leading-relaxed">{children}</p>
    </div>
  )
}
