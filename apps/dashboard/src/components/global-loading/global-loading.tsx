export function GlobalLoading({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center w-full h-screen">
      <div className="animate-spin  rounded-full h-20 w-20 border-b-2 border-gray-300" />
    </div>
  );
}
