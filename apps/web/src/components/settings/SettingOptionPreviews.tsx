import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export function SettingOptionPreviews({
  options,
}: {
  options: ReadonlyArray<{
    label: string;
    caption: string;
    current: boolean;
    illustration: ReactNode;
  }>;
}) {
  return (
    <div className="flex w-max max-w-full flex-wrap gap-3 p-3">
      {options.map((option) => (
        <div key={option.label} className="w-[170px] max-w-full shrink-0">
          <div
            aria-hidden="true"
            className={cn(
              "h-[118px] overflow-hidden rounded-lg border bg-background p-2",
              option.current && "ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
          >
            {option.illustration}
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-xs font-medium">
            {option.label}
            {option.current && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-3xs text-primary-foreground">
                current
              </span>
            )}
          </div>
          <p className="mt-1 text-center text-xs text-muted-foreground">{option.caption}</p>
        </div>
      ))}
    </div>
  );
}

function ProjectRow({
  name,
  environments,
  lines,
}: {
  name: string;
  environments: string[];
  lines: number;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 rounded bg-muted/40 px-1 py-0.5 text-3xs">
        <span className="size-2 shrink-0 rounded-sm bg-muted-foreground/50" />
        <span className="flex-1">{name}</span>
        {environments.map((environment) => (
          <span key={environment} className="rounded border px-1 text-5xs text-muted-foreground">
            {environment}
          </span>
        ))}
      </div>
      <div className="my-1 ml-4 space-y-1">
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 rounded bg-muted-foreground/20",
              index % 2 === 0 ? "w-4/5" : "w-3/5",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function ProjectGroupingIllustration({ grouped }: { grouped: boolean }) {
  return (
    <div className="space-y-1">
      <ProjectRow
        name="t3code"
        environments={grouped ? ["Mac", "Server"] : ["Mac"]}
        lines={grouped ? 3 : 2}
      />
      {!grouped && <ProjectRow name="t3code" environments={["Server"]} lines={1} />}
      <ProjectRow name="website" environments={["Mac"]} lines={1} />
    </div>
  );
}

function Submodule({
  prefix,
  name,
  populated,
}: {
  prefix: string;
  name: string;
  populated: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 whitespace-pre",
        !populated && "text-muted-foreground/50",
      )}
    >
      <span>{prefix}</span>
      <span
        className={cn(
          "size-2 shrink-0 rounded-xs",
          populated ? "bg-success" : "border border-dashed border-muted-foreground/50",
        )}
      />
      <span>{name}</span>
    </div>
  );
}

export function SubmodulesIllustration({ mode }: { mode: "none" | "top-level" | "recursive" }) {
  return (
    <div className="font-mono text-3xs leading-4.5">
      <div>worktree/</div>
      <div>├ src/</div>
      <Submodule prefix="├" name="libs/ui/" populated={mode !== "none"} />
      <Submodule prefix="│ └" name="vendor/" populated={mode === "recursive"} />
      <div>└ package.json</div>
    </div>
  );
}

export function ProactivePanelsIllustration({ enabled }: { enabled: boolean }) {
  return (
    <div className="flex h-full gap-1.5">
      <div className="flex min-w-0 flex-1 flex-col justify-end gap-1">
        <div className="mb-1 ml-auto h-1.5 w-2/3 rounded bg-primary/35" />
        <div className="h-1.5 w-full rounded bg-muted-foreground/20" />
        <div className="h-1.5 w-4/5 rounded bg-muted-foreground/20" />
        <div className="h-1.5 w-2/5 rounded bg-muted-foreground/20" />
      </div>
      {enabled && (
        <div className="w-1/2 border-l pl-1.5 text-4xs">
          <div className="font-medium">Pull request</div>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success" />
            #128 open
          </div>
          <div className="my-2 border-t border-dashed" />
          <div className="mb-1 font-medium text-muted-foreground">or Changes</div>
          <div className="space-y-0.5">
            <div className="h-1 rounded bg-muted-foreground/20" />
            <div className="h-1 rounded bg-destructive/35" />
            <div className="h-1 rounded bg-success/40" />
            <div className="h-1 w-2/3 rounded bg-success/40" />
          </div>
        </div>
      )}
    </div>
  );
}
