import { Link } from 'react-router';

type AdapterRouterProps = {
  children: React.ReactNode;
  href: string;
} & React.ComponentProps<'a'>;

export function AdapterRouter({
  children,
  href,
  ...props
}: AdapterRouterProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
