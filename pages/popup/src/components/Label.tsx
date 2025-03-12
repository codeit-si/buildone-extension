import { cn } from '@extension/ui';
import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

export default function Label({ label, className, htmlFor, ...props }: LabelProps) {
  return (
    <label className={cn('mb-12 block font-semibold text-slate-800', className)} htmlFor={htmlFor} {...props}>
      {label}
    </label>
  );
}
