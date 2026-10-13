import { useReducedMotion } from 'motion/react'
import { lazy } from 'react'
import ScrollStack, { ScrollStackItem } from '@/components/bits/ScrollStack'
import { LiveField } from '@/components/LiveField'
import { ProjectDiagram } from '@/components/ui/ProjectDiagram'
import { projects, type Project } from '@/content'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePalette } from '@/hooks/usePalette'
import { withAlpha } from '@/lib/color'

const DotField = lazy(() => import('@/components/bits/DotField'))

const CARD_STYLE = { boxShadow: 'var(--shadow-raised)' }

function CaseFile({ project, index }: { project: Project; index: number }) {
  return (
    <article className="grid gap-lg lg:grid-cols-12 lg:gap-2xl">
      <div className="flex flex-col lg:col-span-5">
        <p className="label flex flex-wrap justify-between gap-x-md gap-y-2xs text-muted">
          <span className="whitespace-nowrap text-accent">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <span>
            {project.year} · {project.company}
          </span>
        </p>
        <h3 className="mt-lg min-w-0 font-display text-heading leading-[0.95] font-[760] tracking-[-0.01em] uppercase [font-stretch:90%] [overflow-wrap:break-word]">
          {project.title}
        </h3>
        <p className="mt-md text-ink-2">{project.summary}</p>

        <dl className="mt-lg grid gap-sm border-t border-rule pt-lg lg:mt-auto">
          <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-md">
            <dt className="label pt-2xs text-muted">Role</dt>
            <dd className="text-ink-2">{project.role}</dd>
          </div>
          <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-md">
            <dt className="label pt-2xs text-muted">Outcome</dt>
            <dd className="text-ink">{project.outcome}</dd>
          </div>
        </dl>
        <ul className="mt-md flex flex-wrap gap-2xs">
          {project.stack.map((item) => (
            <li key={item} className="label rounded-pill bg-paper-3 px-sm py-2xs text-ink-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-[clamp(16rem,46vh,32rem)] overflow-hidden rounded-md bg-paper outline-1 -outline-offset-1 outline-(--outline-image) lg:col-span-7 lg:h-[clamp(20rem,58vh,30rem)]">
        <ProjectDiagram kind={project.diagram} className="block h-full w-full" />
      </div>
    </article>
  )
}

export function Work() {
  const calm = useReducedMotion() ?? false
  const roomy = useMediaQuery('(min-width: 64rem) and (min-height: 800px)') // pinned cards must fit the viewport or their lower half is never reachable
  const palette = usePalette()

  return (
    <section id="work" aria-labelledby="work-title" className="relative isolate pt-4xl pb-2xl">
      <LiveField className="fade-edges">
        <DotField
          dotRadius={1.1}
          dotSpacing={22}
          cursorRadius={360}
          bulgeStrength={40}
          glowRadius={220}
          gradientFrom={withAlpha(palette.accent, 0.28)}
          gradientTo={withAlpha(palette.glacier, 0.16)}
          glowColor={palette.paper}
        />
      </LiveField>

      <div className="page-frame">
        <div className="grid gap-lg lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="title lg:col-span-8">
            Selected
            <br />
            work
          </h2>
          <div className="lg:col-span-4">
            <p className="label text-accent">04 case files · 2019–2025</p>
            <p className="mt-sm text-ink-2">
              Two kinds of problem: systems that have to stay correct under load, and the interfaces people use to
              trust them.
            </p>
          </div>
        </div>

        <div className="mt-2xl">
          {calm || !roomy ? (
            <ol className="grid gap-lg">
              {projects.map((project, index) => (
                <li key={project.id} className="raised rounded-lg p-lg md:p-xl">
                  <CaseFile project={project} index={index} />
                </li>
              ))}
            </ol>
          ) : (
            <ScrollStack
              useWindowScroll
              smoothScroll={false}
              itemDistance={96}
              itemStackDistance={22}
              stackPosition="14%"
              baseScale={0.9}
              itemScale={0.025}
              dimAmount={0.45}
              holdDistance={120}
            >
              {projects.map((project, index) => (
                <ScrollStackItem
                  key={project.id}
                  itemClassName="rounded-lg bg-paper-2 p-lg md:p-xl"
                  style={CARD_STYLE}
                >
                  <CaseFile project={project} index={index} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          )}
        </div>
      </div>
    </section>
  )
}
