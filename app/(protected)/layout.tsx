const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-16 p-8 bg-slate-50">
      {children}
    </div>
  );
};

export default ProtectedLayout;