export type Props<T> =
  | (JSX.IntrinsicAttributes &
      React.PropsWithoutRef<T> &
      // tslint:disable-next-line
      React.RefAttributes<React.Component<T, any, any>>)
  | (JSX.IntrinsicAttributes & React.PropsWithRef<React.PropsWithChildren<T>>)
