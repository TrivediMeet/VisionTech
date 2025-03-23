
interface AuthErrorProps {
  error: string | null;
}

export const AuthError = ({ error }: AuthErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
      {error}
    </div>
  );
};
