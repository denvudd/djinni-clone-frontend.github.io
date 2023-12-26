'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { VariantProps, cva } from 'class-variance-authority';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        destructive:
          'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-foreground-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
        {variant === 'default' ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4 text-white" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
