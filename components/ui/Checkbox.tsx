import { FC, HTMLProps, useEffect, useRef } from 'react';

type CheckboxProps = {
  indeterminate?: boolean;
  onCheckedChange?: (value: boolean | 'indeterminate') => void;
} & HTMLProps<HTMLInputElement>;

export const Checkbox: FC<CheckboxProps> = ({
  indeterminate,
  onCheckedChange,
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className="h-4 w-4 cursor-pointer rounded border-neutral-800 bg-neutral-900 text-sky-700 ring-offset-sky-800 transition hover:text-sky-800 focus:ring-0 focus:ring-offset-sky-800"
      onChange={(e) => {
        const v = e.target.value;
        onCheckedChange?.(
          v === 'on' ? true : v === 'off' ? false : 'indeterminate',
        );
      }}
      {...rest}
    />
  );
};
