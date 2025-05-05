export const ErrorMessage = ({ error }: { error: string }) => {
  return <p className={`my-1 pl-2 text-sm text-danger`}>{error}</p>;
};
