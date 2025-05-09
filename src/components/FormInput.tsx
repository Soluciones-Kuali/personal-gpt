import { RefCallBack } from 'react-hook-form';
import clsx from 'clsx';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

type FormInputProps = {
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  name?: string;
  numeric?: boolean;
  placeholder?: string;
  ref?: RefCallBack;
  selectOnFocus?: boolean;
  textarea?: boolean;
  type?: string;
  onEnter?: () => void;
};

export function FormInput({
  autoComplete,
  className = '',
  disabled = false,
  error,
  icon,
  label,
  name,
  numeric = false,
  placeholder,
  ref,
  selectOnFocus = false,
  textarea = false,
  type = 'text',
  onEnter,
  ...props
}: FormInputProps) {
  return (
    <div className={clsx('w-full mb-5 h-fit', className)}>
      <InputLabel disabled={disabled} htmlFor={name}>
        {label}
      </InputLabel>
      <TextField
        {...props}
        autoComplete={autoComplete}
        disabled={disabled}
        name={name}
        id={name}
        inputRef={ref}
        fullWidth
        placeholder={placeholder}
        size="small"
        multiline={textarea}
        onFocus={({ target }) => (selectOnFocus ? target.select() : null)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onEnter?.();
            event.preventDefault();
          }
        }}
        rows={textarea ? 2 : 1}
        type={numeric ? 'number' : type}
        error={!!error}
        helperText={error}
        slotProps={{
          input: {
            startAdornment: icon ? (
              <InputAdornment position="start">
                <div className="border-r-[1px] border-r-gray-100 pr-2">
                  {icon}
                </div>
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </div>
  );
}

FormInput.displayName = 'FormInput';
