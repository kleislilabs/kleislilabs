import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 py-1 text-xs file:h-7 file:text-xs",
        default: "h-9 px-3 py-1 text-base md:text-sm file:h-7 file:text-sm",
        lg: "h-10 px-4 py-2 text-base file:h-8 file:text-base",
        xl: "h-12 px-5 py-3 text-lg file:h-10 file:text-lg",
      },
      variant: {
        default: "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        error: "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        success: "border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/20",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

type InputProps = React.ComponentPropsWithoutRef<"input"> &
  VariantProps<typeof inputVariants> & {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    error?: string | boolean
    success?: string | boolean
    helperText?: string
    showPasswordToggle?: boolean
  }

/**
 * Input component with validation states and icon support.
 * 
 * @example
 * <Input 
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * 
 * @example With validation
 * <Input 
 *   error="Invalid email address"
 *   type="email"
 * />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = "text",
    size,
    variant,
    leftIcon,
    rightIcon,
    error,
    success,
    helperText,
    showPasswordToggle,
    disabled,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const fallbackId = React.useId()
    const baseId = props.id || props.name || fallbackId
    const describedById = `${baseId}-helper-text`
    
    const isPasswordType = type === "password"
    const effectiveType = isPasswordType && showPassword ? "text" : type
    
    const computedVariant = error ? "error" : success ? "success" : variant
    const showToggle = isPasswordType && showPasswordToggle && !disabled
    const hasHelperContent = !!(error || success || helperText)
    
    const inputElement = (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={effectiveType}
          data-slot="input"
          data-testid="input"
          className={cn(
            inputVariants({ size, variant: computedVariant }),
            leftIcon && "pl-9",
            (rightIcon || showToggle || error || success) && "pr-9",
            className
          )}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={hasHelperContent ? describedById : undefined}
          {...props}
          id={props.id || baseId}
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {error && <AlertCircle className="size-4 text-destructive" />}
          {success && !error && <Check className="size-4 text-green-600" />}
          {rightIcon && !error && !success && !showToggle && rightIcon}
          
          {showToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls={props.id || baseId}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>
      </div>
    )
    
    if (hasHelperContent) {
      return (
        <div className="w-full">
          {inputElement}
          <p
            id={describedById}
            className={cn(
              "mt-1.5 text-xs",
              error
                ? "text-destructive"
                : helperText
                  ? "text-muted-foreground"
                  : success
                    ? "text-green-600"
                    : "",
            )}
          >
            {typeof error === "string"
              ? error
              : helperText
                ? helperText
                : typeof success === "string"
                  ? success
                  : null}
          </p>
        </div>
      )
    }
    
    return inputElement
  }
)
Input.displayName = "Input"

export { Input, inputVariants, type InputProps }