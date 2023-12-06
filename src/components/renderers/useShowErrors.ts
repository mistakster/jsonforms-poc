import { useCallback, useState } from "react";

interface TouchedConfig {
  touched?: boolean;
}

export function useShowErrors(errors: string, config: TouchedConfig) {
  const [isTouched, setTouched] = useState(false);

  const onBlur = useCallback(() => {
    setTouched(true)
  }, []);

  return {
    isInvalid: config.touched || isTouched ? !!errors : false,
    onBlur
  };
}
