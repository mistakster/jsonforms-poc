import { FC, useId, useState } from "react";

export const withIdProp = <P = {}>(Component: FC<P>) => {
  const WithIdProp = (props: P) => {
    const id = useId();
    const [isTouched, setTouched] = useState(false)

    return (
      <Component
        {...props}
        id={id}
        onBlur={() => setTouched(true)}
        touched={isTouched}
      />
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    WithIdProp.displayName = 'WithIdProp';
  }

  return WithIdProp;
};
