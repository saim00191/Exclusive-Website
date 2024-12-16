interface Props {
  children: React.ReactNode;
  className?: string;
}
const Wrapper = ({ children, className }: Props) => {
  return (
    <div className={`${className} max-w-[1170px] mx-auto`}>{children}</div>
  );
};

export default Wrapper;
